import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { plantSchema } from "@/schemas/api-schema";
import { Prisma, UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

	const plantValidation = plantSchema.safeParse(body);
	if (!plantValidation.success) {
		return NextResponse.json(plantValidation.error.errors, { status: 400 });
	}
	const { name, description } = plantValidation.data;

	try {
		//check organization
		const existingOrganization = await prisma.organization.findUnique({
			where: { id: user.organizationId! },
		});
		if (!existingOrganization)
			return NextResponse.json(
				{ error: "Organization not found" },
				{ status: 404 }
			);

		const newPlant = await prisma.plant.create({
			data: {
				name: body.name,
				description,
				organizationId: existingOrganization.id,
			},
		});
		return NextResponse.json(newPlant, { status: 201 });
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2002"
		) {
			// P2002 is the error code for unique constraint violations
			return NextResponse.json(
				{ error: "Name already in use." },
				{ status: 400 }
			);
		}
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
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

	const allPlants = await prisma.plant.findMany({
		where: { organizationId: user.organizationId },
	});
	return NextResponse.json(allPlants, { status: 200 });
}
