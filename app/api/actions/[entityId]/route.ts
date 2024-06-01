import { currentUser } from "@/lib/auth";
import { parseJsonSafely } from "@/lib/utils";
import prisma from "@/prisma/client";
import { actionAPISchema } from "@/schemas/api-schema";
import { ActionStatus, UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { actionDataArraySchema } from "@/schemas/data-table";
import { z } from "zod";
import { actionDataTableViewSchema } from "@/app/control-panel/data/schema";

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
	const validateAction = actionAPISchema.safeParse(body);
	if (!validateAction.success)
		return NextResponse.json(validateAction.error.errors, { status: 400 });
	const {
		boolValue,
		eventId,
		floatValue,
		intValue,
		stringValue,
		schedule: optionalSchedule,
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
	const schedule = optionalSchedule ?? new Date();
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

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { entityId: string } }
) {
	const searchParams = request.nextUrl.searchParams;
	const actionId = parseInt(searchParams.get("actionId") ?? "");
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
	//TURN ON AFTER TESTING!
	//permission
	// if (!user.role || !user.organizationId) {
	// 	return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	// }
	if (!actionId || !params.entityId) {
		return NextResponse.json(
			{ error: "Invalid query parameters" },
			{ status: 400 }
		);
	}

	const body = await request.json();
	const validateAction = actionAPISchema.safeParse(body);
	if (!validateAction.success)
		return NextResponse.json(validateAction.error.errors, { status: 400 });
	const {
		boolValue,
		eventId,
		floatValue,
		intValue,
		stringValue,
		schedule,
		valueType,
	} = validateAction.data;
	try {
		const eventGroupId = params.entityId + "-group";
		const action = await prisma.action.findUnique({
			where: { eventGroupId_id: { id: actionId, eventGroupId } },
		});
		if (!action)
			return NextResponse.json(
				{ error: "Could not find action to update." },
				{ status: 404 }
			);

		const updatedAction = await prisma.action.update({
			where: {
				eventGroupId_id: { id: action.id, eventGroupId: action.eventGroupId },
			},
			data: {
				boolValue,
				eventId,
				floatValue,
				intValue,
				stringValue,
				schedule,
				valueType,
			},
		});
		if (!updatedAction)
			return NextResponse.json(
				{ error: "Could not update action." },
				{ status: 500 }
			);
		return NextResponse.json(updatedAction, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong while trying to update." },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { entityId: string } }
) {
	const searchParams = request.nextUrl.searchParams;
	const actionId = parseInt(searchParams.get("actionId") ?? "");
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
	//TURN ON AFTER TESTING!
	//permission
	// if (!user.role || !user.organizationId) {
	// 	return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	// }
	if (!actionId || !params.entityId) {
		return NextResponse.json(
			{ error: "Invalid query parameters" },
			{ status: 400 }
		);
	}
	try {
		const eventGroupId = params.entityId + "-group";
		const action = await prisma.action.findUnique({
			where: {
				eventGroupId_id: { id: actionId, eventGroupId },
				status: ActionStatus.SCHEDULED,
			},
		});
		if (!action)
			return NextResponse.json(
				{ error: "Could not find action to delete." },
				{ status: 404 }
			);
		await prisma.action.delete({
			where: {
				eventGroupId_id: { id: action.id, eventGroupId: action.eventGroupId },
			},
		});
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json(
			{ error: "Could not delete action." },
			{ status: 500 }
		);
	}
}
