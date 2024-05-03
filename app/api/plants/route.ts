import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { plantSchema } from "@/schemas/api-schema";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	//check if user has permission from session
	if (user.role === UserRole.USER || !user.role)
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });

	const plantValidation = plantSchema.safeParse(body);
	if (!plantValidation.success) {
		return NextResponse.json(plantValidation.error.errors, { status: 400 });
	}
	const { name, description } = plantValidation.data;

	//check organization
	const existingOrganization = await prisma.organization.findUnique({
		where: { id: user.organizationId! },
	});
	if (!existingOrganization)
		return NextResponse.json(
			{ error: "Organization not found" },
			{ status: 404 }
		);

	//check if plant exists
	const findPlant = await prisma.plant.findUnique({
		where: {
			name_organizationId: {
				name: name,
				organizationId: existingOrganization.id,
			},
		},
	});
	if (findPlant) {
		return NextResponse.json(
			{ error: "Plant already exists." },
			{ status: 400 }
		);
	}
	const newPlant = await prisma.plant.create({
		data: {
			name: body.name,
			description,
			//org_id : sessionParams.org_id
		},
	});
	return NextResponse.json(newPlant, { status: 201 });
}

export async function GET(request: NextRequest) {
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	if (user.role === UserRole.USER || !user.role || !user.organizationId)
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });

	const allPlants = await prisma.plant.findMany({
		where: { organizationId: user.organizationId },
	});
	return NextResponse.json(allPlants, { status: 200 });
}
