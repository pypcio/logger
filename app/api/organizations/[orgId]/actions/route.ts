import { currentUser } from "@/lib/auth";
import { parseJsonSafely, removeGroupSuffix } from "@/lib/utils";
import prisma from "@/prisma/client";
import { actionAPISchema } from "@/schemas/api-schema";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { actionDataArraySchema } from "@/schemas/data-table";
import { actionDataTableViewArraySchema } from "@/app/control-panel/data/schema";

//get actions for organization
export async function GET(
	request: NextRequest,
	{ params }: { params: { orgId: string } }
) {
	const searchParams = request.nextUrl.searchParams;
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
	//filter eventGroups based on filters:
	try {
		const actions = await prisma.action.findMany({
			where: {
				device: {
					plant: {
						organizationId: params.orgId,
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
