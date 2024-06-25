import { currentUser } from "@/lib/auth";
import { parseJsonSafely, removeGroupSuffix } from "@/lib/utils";
import prisma from "@/prisma/client";
import { actionAPISchema } from "@/schemas/api-schema";
import { ActionStatus, UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { actionDataArraySchema } from "@/schemas/data-table";
import { actionDataTableViewArraySchema } from "@/app/control-panel/data/schema";
import { publishEvent } from "@/lib/services/api";
import { PublishEventType } from "@/schemas/schemas-types";

//get actions for organization
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const user = await currentUser();

	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in." },
			{ status: 401 }
		);
	}
	if (
		// user.role === UserRole.USER ||
		!user.id ||
		!user.role ||
		!user.organizationId
	) {
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	}
	// if (!user.role || !user.organizationId) {
	// 	return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	// }
	//filter eventGroups based on filters:
	try {
		const actions = await prisma.action.findMany({
			where: {
				device: {
					plant: {
						organizationId: user.organizationId,
					},
				},
			},
			include: {
				device: {
					select: {
						name: true,
						plant: {
							select: {
								name: true,
							},
						},
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
		const formattedData = actions.map((action) => {
			let value = null;
			switch (action.valueType) {
				case "BOOLEAN":
					value = action.stringValue ?? null;
					break;
				case "FLOAT":
					value = action.floatValue;
					break;
				case "INTEGER":
					value = action.intValue;
					break;
				case "STRING":
					value = action.stringValue;
					break;
			}
			return {
				id: action.id,
				device: action.device.name,
				plant: action.device.plant.name,
				action: action.event.name,
				status: action.status,
				value,
				user: action.email,
				schedule: action.schedule,
				unit: action.unit,
			};
		});
		// Validate formatted data
		try {
			const parsedData = actionDataTableViewArraySchema.parse(formattedData);
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
export async function POST(request: NextRequest) {
	const user = await currentUser();
	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in." },
			{ status: 401 }
		);
	}
	if (
		// user.role === UserRole.USER ||
		!user.id ||
		!user.role ||
		!user.organizationId
	) {
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	}
	const body = await request.json();
	// console.log("content: ", body);
	const validateAction = actionAPISchema.safeParse(body);
	if (!validateAction.success) {
		return NextResponse.json(validateAction.error.errors, { status: 400 });
	}
	const {
		boolValue,
		eventId,
		deviceId,
		floatValue,
		intValue,
		stringValue,
		schedule: optionalSchedule,
		valueType,
	} = validateAction.data;
	// Fetch the event configuration
	const event = await prisma.event.findUnique({
		where: { deviceId_id: { id: eventId, deviceId } },
	});
	if (!event)
		return NextResponse.json(
			{ error: "Event does not exist." },
			{ status: 404 }
		);
	const valueTypeEvent = event.valueType;
	const schedule = optionalSchedule ?? new Date();
	let boolValueToString = null;
	let sendValue = null;
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
			sendValue = floatValue;
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
			sendValue = intValue;
			break;
		case "BOOLEAN":
			if (predefinedValues) {
				if (boolValue === false) {
					boolValueToString = predefinedValues[0] || "false";
				} else if (boolValue === true) {
					boolValueToString = predefinedValues[1] || "true";
				}
			}
			sendValue = boolValue;
			break;
		case "STRING":
			if (predefinedValues && !predefinedValues.includes(stringValue)) {
				return NextResponse.json(
					{ error: `stringValue should be one of ${predefinedValues}` },
					{ status: 400 }
				);
			}
			sendValue = stringValue;
			break;
		default:
			return NextResponse.json({ error: "Invalid valueType" }, { status: 400 });
	}

	//--------------------------------------------------------------------
	//publish message, and if success, create action with status 'pending'
	try {
		if (schedule <= new Date()) {
			//call device mapper
			const deviceAssigment = await prisma.deviceAssigment.findUnique({
				where: { device_id: deviceId },
			});
			if (!deviceAssigment)
				return NextResponse.json(
					{
						error: "Device is not assigned. Please contact first.",
					},
					{ status: 400 }
				);
			const payload: PublishEventType = {
				slave_id: deviceAssigment.slave_id,
				oper: event.topic,
				value: sendValue!,
			};
			//publish message
			try {
				const publish = await publishEvent(deviceAssigment.master_id, [
					payload,
				]);
				if (publish.status >= 200 && publish.status < 300) {
					// on success
					const newAction = await prisma.action.create({
						data: {
							valueType,
							intValue,
							boolValue,
							floatValue,
							stringValue: stringValue ?? boolValueToString,
							status: ActionStatus["PENDING"],
							schedule,
							unit,
							eventId,
							deviceId,
							email: user.email!,
						},
					});
					return NextResponse.json(newAction, { status: 201 });
				} else {
					// on failure
					return NextResponse.json(
						{ error: `Could not publish message: ${publish.statusText}` },
						{ status: publish.status }
					);
				}
			} catch (error: any) {
				// Handle the error properly
				return NextResponse.json(
					{ error: `Could not publish message: ${error.message}` },
					{ status: 500 }
				);
			}
		} else {
			//create new Action
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
					deviceId,
					email: user.email!,
				},
			});
			// console.log("new action: ", newAction);
			return NextResponse.json(newAction, { status: 201 });
		}
	} catch (error) {
		return NextResponse.json(
			{ error: "could not create new Action." },
			{ status: 500 }
		);
	}
}
