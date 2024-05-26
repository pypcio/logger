import { currentUser } from "@/lib/auth";
import { parseJsonSafely } from "@/lib/utils";
import prisma from "@/prisma/client";
import { actionSchema } from "@/schemas/api-schema";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { actionDataArraySchema } from "@/schemas/data-table";
//get actions from entity
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const entityType = searchParams.get("entityType");
	const entityId = searchParams.get("entityId");
	const user = await currentUser();
	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in." },
			{ status: 401 }
		);
	}
	// if (!user.role || !user.organizationId) {
	// 	return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	// }
	if (!entityType || !entityId) {
		return NextResponse.json(
			{ error: "Invalid query parameters" },
			{ status: 400 }
		);
	}
	//filter eventGroups based on filters:
	try {
		let eventGroups = [];
		switch (entityType) {
			case "organization":
				eventGroups = await prisma.eventGroup.findMany({
					where: {
						organizationId: entityId,
					},
				});
				if (eventGroups.length === 0) {
					return NextResponse.json(
						{ error: "No Event Group for Organization." },
						{ status: 404 }
					);
				}
				break;
			case "plant":
				eventGroups = await prisma.eventGroup.findMany({
					where: { plantId: entityId },
				});
				if (eventGroups.length === 0) {
					return NextResponse.json(
						{ error: "No Event Group for Plant." },
						{ status: 404 }
					);
				}
				break;
			case "entity":
				const eventGroupId = entityId + "-group";
				const eventGroup = await prisma.eventGroup.findUnique({
					where: { id: eventGroupId },
				});
				if (!eventGroup) {
					return NextResponse.json(
						{ error: "Entity event group not found." },
						{ status: 404 }
					);
				}
				eventGroups = [eventGroup]; // Normalize to an array
				break;
			default:
				return NextResponse.json(
					{ error: "Invalid entity type." },
					{ status: 400 }
				);
		}
		const eventGroupIds = eventGroups.map((group) => group.id);

		const actions = await prisma.action.findMany({
			where: {
				eventGroupId: {
					in: eventGroupIds,
				},
			},
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
				eventGroup: {
					select: {
						deviceName: true,
						plantName: true,
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
					value = item.stringValue ?? null;
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
				device: item.eventGroup.deviceName,
				plant: item.eventGroup.plantName,
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
