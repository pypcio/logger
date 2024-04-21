import { plantSchema } from "@/schemas/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();

	const plantValidation = plantSchema.safeParse(body);

	if (!plantValidation.success) {
		return NextResponse.json(plantValidation.error.errors, { status: 400 });
	}
	//check if plant exists (add in where- org_id: sessionParams.org_id)
	const findPlant = await prisma.plant.findUnique({ where: { name: body.name } });
	if (findPlant) {
		return NextResponse.json({ error: "Plant already exists." }, { status: 400 });
	}

	const newPlant = await prisma.plant.create({
		data: {
			name: body.name,
			description: body.description,
			//org_id : sessionParams.org_id
		},
	});

	return NextResponse.json(newPlant, { status: 201 });
}

//when org introduced, add where {org_id: request.orgId}
export async function GET(request: NextRequest) {
	const allPlants = await prisma.plant.findMany({});
	return NextResponse.json(allPlants, { status: 200 });
}
