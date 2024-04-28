import { NextRequest, NextResponse } from "next/server";
import { inverterSchema } from "@/schemas/api-schema";
import prisma from "@/prisma/client";

export async function POST(
	request: NextRequest,
	{ params }: { params: { plantId: string } }
) {
	const body = await request.json();
	const inverterValidation = inverterSchema.safeParse(body);

	if (!inverterValidation.success) {
		return NextResponse.json(inverterValidation.error.errors, { status: 400 });
	}

	//validate plant
	const plant = await prisma.plant.findUnique({
		where: { id: params.plantId },
	});
	if (!plant)
		return NextResponse.json({ error: "Plant not found." }, { status: 404 });

	//check if inverter name already exists in a group
	const inverter = await prisma.inverter.findFirst({
		where: { name: body.name, plant_id: plant.id },
	});
	if (inverter) {
		return NextResponse.json(
			{ error: "Name already in use." },
			{ status: 400 }
		);
	}

	const newInverter = await prisma.inverter.create({
		data: {
			name: body.name,
			plant_id: plant.id,
			description: body.description,
			model: body.model,
			producent: body.producent,
		},
	});
	return NextResponse.json(newInverter, { status: 201 });
}

export async function GET(
	request: NextRequest,
	{ params }: { params: { plantId: string } }
) {
	const inverters = await prisma.inverter.findMany({
		where: { plant_id: params.plantId },
	});
	return NextResponse.json(inverters);
}
