import { currentUser } from "@/lib/auth";
import { parseJsonSafely } from "@/lib/utils";
import prisma from "@/prisma/client";
import { actionSchema } from "@/schemas/api-schema";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { actionDataArraySchema } from "@/schemas/data-table";
import { z } from "zod";

export async function POST(
	request: NextRequest,
	{ params }: { params: { entityId: string } }
) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in." },
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
	const validateAction = actionSchema.safeParse(body);
	if (!validateAction.success)
		return NextResponse.json(validateAction.error.errors, { status: 400 });
	const {
		boolValue,
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
	let boolValueToString = null;
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
			if (predefinedValues) {
				if (boolValue === false) {
					boolValueToString = predefinedValues[0] || "false";
				} else if (boolValue === true) {
					boolValueToString = predefinedValues[1] || "true";
				}
			}
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
		const newAction = await prisma.action.create({
			data: {
				valueType,
				intValue,
				boolValue,
				floatValue,
				stringValue: stringValue ?? boolValueToString,
				schedule,
				status,
				unit,
				eventId,
				eventGroupId: params.entityId,
				userId: user.id,
			},
		});
		return NextResponse.json(newAction, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "could not create new Action." });
	}
}
//get actions from entity
export async function GET(
	request: NextRequest,
	{ params }: { params: { entityId: string } }
) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in." },
			{ status: 401 }
		);
	}
	if (user.role === UserRole.USER || !user.role || !user.organizationId) {
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	}

	try {
		const eventGroupId = params.entityId + "-group";
		const eventGroup = await prisma.eventGroup.findUnique({
			where: { id: eventGroupId },
		});
		if (!eventGroup)
			return NextResponse.json({ error: "Incorrent entity's event group." });
		//fetch Entity information:
		let entity = null;
		switch (eventGroup.deviceType) {
			case "PLANT":
				entity = await prisma.plant.findUnique({
					where: { id: params.entityId },
				});
				break;
			case "INVERTER":
				entity = await prisma.inverter.findUnique({
					where: { id: params.entityId },
				});
				break;
			case "LOGGER":
				entity = await prisma.logger.findUnique({
					where: { id: params.entityId },
				});
				break;
			case "METER":
				entity = await prisma.meter.findUnique({
					where: { id: params.entityId },
				});
				break;
			case "SECURITY_DEVICE":
				entity = await prisma.securityDevice.findUnique({
					where: { id: params.entityId },
				});
				break;
			default:
				return NextResponse.json(
					{ error: "Invalid Device Type" },
					{ status: 400 }
				);
		}
		if (!entity)
			return NextResponse.json({ error: "Entity not found." }, { status: 404 });
		//fetch eventGroup
		const actions = await prisma.action.findMany({
			where: { eventGroupId: eventGroup.id },
			include: {
				user: {
					select: {
						email: true,
					},
				},
				event: {
					select: {
						name: true,
					},
				},
			},
			orderBy: { schedule: "desc" },
		});
		if (!actions.length)
			return NextResponse.json({ error: "No Action Found." }, { status: 404 });

		// Map and validate the data to fit the schema
		const formattedData = actions.map((item) => {
			let value = null;
			switch (item.valueType) {
				case "BOOLEAN":
					if (item.boolValue) {
						value = item.boolValue ? item.stringValue : null;
					}
					break;
				case "FLOAT":
					value = item.floatValue;
					break;
				case "INTEGER":
					value = item.intValue;
					break;
				case "STRING":
					value = item.stringValue;
					break;
			}
			return {
				id: item.id,
				device: eventGroup.deviceName,
				plant: eventGroup.plantName,
				action: item.event.name,
				status: item.status,
				value,
				user: item.user.email,
				schedule: item.schedule,
				unit: item.unit,
			};
		});
		// Validate formatted data
		try {
			const parsedData = actionDataArraySchema.parse(formattedData);
			return NextResponse.json(parsedData);
		} catch (error) {
			return NextResponse.json(
				{ error: "Data validation failed." },
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Could not fetch data" },
			{ status: 500 }
		);
	}
}
