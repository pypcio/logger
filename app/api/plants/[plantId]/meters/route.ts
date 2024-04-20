import { NextRequest, NextResponse } from "next/server";
import { meterSchema } from "@/app/_validationSchemas/schema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest, { params }: { params: { plantId: string } }) {
	const body = await request.json();
	const meterValidation = meterSchema.safeParse(body);

	if (!meterValidation.success) {
		return NextResponse.json(meterValidation.error.errors, { status: 400 });
	}

	//validate plant
	const plant = await prisma.plant.findUnique({
		where: { id: params.plantId },
	});
	if (!plant) return NextResponse.json({ error: "Plant not found." }, { status: 404 });

	//check if Meter name already exists in a group
	const meter = await prisma.meter.findFirst({
		where: { name: body.name, plant_id: plant.id },
	});
	if (meter) {
		return NextResponse.json({ error: "Name already in use." }, { status: 400 });
	}

	const newMeter = await prisma.meter.create({
		data: {
			name: body.name,
			plant_id: plant.id,
			description: body.description,
			model: body.model,
			producent: body.producent,
		},
	});
	return NextResponse.json(newMeter, { status: 201 });
}

export async function GET(request: NextRequest, { params }: { params: { plantId: string } }) {
	const meters = await prisma.meter.findMany({ where: { plant_id: params.plantId } });
	return NextResponse.json(meters);
}
