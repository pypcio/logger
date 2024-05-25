import { currentUser } from "@/lib/auth";
import { parseJsonSafely } from "@/lib/utils";
import prisma from "@/prisma/client";
import { ActionSchema } from "@/schemas/api-schema";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	}
	if (
		user.role === UserRole.USER ||
		!user.id ||
		!user.role ||
		!user.organizationId
	) {
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	}
	const body = await request.json();
	const validateAction = ActionSchema.safeParse(body);
	if (!validateAction.success)
		return NextResponse.json(validateAction.error.errors, { status: 400 });
	const {
		boolValue,
		eventGroupId,
		eventId,
		floatValue,
		intValue,
		stringValue,
		schedule,
		status,
		valueType,
	} = validateAction.data;
	// Fetch the event configuration
	const event = await prisma.event.findUnique({ where: { id: eventId } });
	if (!event)
		return NextResponse.json(
			{ error: "Event does not exist." },
			{ status: 404 }
		);
	const valueTypeEvent = event.valueType;
	const unit = event.unit;
	const predefinedValues = event.predefinedValues
		? parseJsonSafely(event.predefinedValues)
		: null;
	//configuration validation
	switch (valueTypeEvent) {
		case "FLOAT":
			if (event.rangeStart !== null && floatValue! < event.rangeStart) {
				return NextResponse.json(
					{
						error: `floatValue should be greater than or equal to ${event.rangeStart}`,
					},
					{ status: 400 }
				);
			}
			if (event.rangeEnd !== null && floatValue! > event.rangeEnd) {
				return NextResponse.json(
					{
						error: `floatValue should be less than or equal to ${event.rangeEnd}`,
					},
					{ status: 400 }
				);
			}
			if (
				event.step !== null &&
				(floatValue! - event.rangeStart!) % event.step !== 0
			) {
				return NextResponse.json(
					{
						error: `floatValue should be a multiple of ${event.step} from ${event.rangeStart}`,
					},
					{ status: 400 }
				);
			}
			break;
		case "INTEGER":
			if (event.rangeStart !== null && intValue! < event.rangeStart) {
				return NextResponse.json(
					{
						error: `intValue should be greater than or equal to ${event.rangeStart}`,
					},
					{ status: 400 }
				);
			}
			if (event.rangeEnd !== null && intValue! > event.rangeEnd) {
				return NextResponse.json(
					{
						error: `intValue should be less than or equal to ${event.rangeEnd}`,
					},
					{ status: 400 }
				);
			}
			if (
				event.step !== null &&
				(intValue! - event.rangeStart!) % event.step !== 0
			) {
				return NextResponse.json(
					{
						error: `intValue should be a multiple of ${event.step} from ${event.rangeStart}`,
					},
					{ status: 400 }
				);
			}
			break;
		case "BOOLEAN":
			// No additional validation needed for BOOLEAN, already checked by schema
			break;
		case "STRING":
			if (predefinedValues && !predefinedValues.includes(stringValue)) {
				return NextResponse.json(
					{ error: `stringValue should be one of ${predefinedValues}` },
					{ status: 400 }
				);
			}
			break;
		default:
			return NextResponse.json({ error: "Invalid valueType" }, { status: 400 });
	}
	//create new Action
	try {
		const newActon = await prisma.action.create({
			data: {
				valueType,
				intValue,
				boolValue,
				floatValue,
				stringValue,
				schedule,
				status,
				unit,
				eventId,
				eventGroupId,
				userId: user.id,
			},
		});
		if (!newActon)
			return NextResponse.json(
				{ error: "Could not create new Action." },
				{ status: 400 }
			);
		return;
	} catch (error) {
		return NextResponse.json({ error: "could not create new Action." });
	}
}

export async function GET(request: NextRequest) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	}
	if (user.role === UserRole.USER || !user.role || !user.organizationId) {
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	}

	try {
		const existingOrganization = await prisma.organization.findUnique({
			where: { id: user.organizationId },
			include: {
				plants: {
					select: {
						id: true,
					},
				},
			},
		});
		if (!existingOrganization) {
			return NextResponse.json(
				{ error: "Organization not found." },
				{ status: 404 }
			);
		}

		const plantIds = existingOrganization.plants.map((plant) => plant.id);

		// Fetch action controls for all plants in the organization
		const actionControlForOrg = await prisma.actionControl.findMany({
			where: {
				plantId: {
					in: plantIds,
				},
			},
			include: {
				action: {
					select: {
						name: true,
						unit: true,
					},
				},
				plant: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				schedule: "desc",
			},
		});

		if (!actionControlForOrg.length) {
			return NextResponse.json(
				{ error: "Control actions not found." },
				{ status: 404 }
			);
		}

		// Map and validate the data to fit the schema
		const formattedData = actionControlForOrg.map((item) => ({
			id: item.id,
			name: item.plant.name,
			action: item.action.name,
			status: item.status,
			value: item.value,
			schedule: new Date(item.schedule),
			unit: item.action.unit,
		}));

		// Validate the mapped data using Zod
		const parsedData = z.array(actionControlSchema).parse(formattedData);

		return NextResponse.json(parsedData);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Could not fetch data" },
			{ status: 400 }
		);
	}
}
