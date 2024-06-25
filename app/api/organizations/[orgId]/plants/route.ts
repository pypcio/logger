import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { plantSchema } from "@/schemas/api-schema";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	request: NextRequest,
	{ params }: { params: { orgId: string } }
) {
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	const validMembership = await prisma.organizationMembership.findUnique({
		where: {
			userId_organizationId: {
				userId: user.id!,
				organizationId: params.orgId,
			},
		},
	});
	if (!validMembership)
		return NextResponse.json(
			{ error: "User does not belong to Organization" },
			{ status: 400 }
		);

	if (validMembership.role === UserRole.USER)
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });

	const body = await request.json();
	const plantValidation = plantSchema.safeParse(body);
	if (!plantValidation.success) {
		return NextResponse.json(plantValidation.error.errors, { status: 400 });
	}
	const { name, description } = plantValidation.data;

	//check if plant exists
	const findPlant = await prisma.plant.findUnique({
		where: {
			name_organizationId: {
				name: name,
				organizationId: validMembership.organizationId,
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
			organizationId: params.orgId,
			//org_id : sessionParams.org_id
		},
	});

	return NextResponse.json(newPlant, { status: 201 });
}

//when org introduced, add where {org_id: request.orgId}
export async function GET(
	request: NextRequest,
	{ params }: { params: { orgId: string } }
) {
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	// check if user has permission
	try {
		const validMembership = await prisma.organizationMembership.findUnique({
			where: {
				userId_organizationId: {
					userId: user.id!,
					organizationId: params.orgId,
				},
			},
		});
		if (!validMembership)
			return NextResponse.json(
				{ error: "User does not belong to Organization" },
				{ status: 400 }
			);

		if (validMembership.role === UserRole.USER)
			return NextResponse.json(
				{ error: "User not permitted" },
				{ status: 403 }
			);

		const allPlants = await prisma.plant.findMany({
			where: { organizationId: validMembership.organizationId },
		});
		return NextResponse.json(allPlants, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500 }
		);
	}
}
