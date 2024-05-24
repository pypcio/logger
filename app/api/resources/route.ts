import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { ActionStatus, UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
const actionStatusValues = Object.values(ActionStatus);
const ActionStatusEnum = z.enum(actionStatusValues as [string, ...string[]]);

const actionControlSchema = z.object({
	id: z.number(),
	name: z.string(),
	action: z.string(),
	status: ActionStatusEnum,
	schedule: z.date(),
	value: z.number().nullable(),
	unit: z.string(),
});
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
				schedule: "asc",
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
