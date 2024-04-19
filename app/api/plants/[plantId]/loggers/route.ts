import { NextRequest, NextResponse } from "next/server";
import { loggerSchema } from "@/app/_validationSchemas/schema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest, { params }: { params: { plantId: string } }) {
	const body = await request.json();
	const loggerValidation = loggerSchema.safeParse(body);

	if (!loggerValidation.success) {
		return NextResponse.json(loggerValidation.error.errors, { status: 400 });
	}

	//validate plant
	const plant = await prisma.plant.findUnique({
		where: { id: params.plantId },
	});
	if (!plant) return NextResponse.json({ error: "Plant not found." }, { status: 404 });

	//check if logger name already exists in a group
	const logger = await prisma.logger.findFirst({
		where: { name: body.name, plant_id: plant.id },
	});
	if (logger) {
		return NextResponse.json({ error: "Name already in use." }, { status: 400 });
	}

	const newLogger = await prisma.logger.create({
		data: {
			name: body.name,
			plant_id: plant.id,
			description: body.description,
			model: body.model,
			producent: body.producent,
		},
	});
	return NextResponse.json(newLogger, { status: 201 });
}

export async function GET(request: NextRequest, { params }: { params: { plantId: string } }) {
	const loggers = await prisma.logger.findMany({ where: { plant_id: params.plantId } });
	return NextResponse.json(loggers);
}
