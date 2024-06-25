import { NextRequest, NextResponse } from "next/server";
import { deviceSchema } from "@/schemas/api-schema";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export async function POST(
	request: NextRequest,
	{ params }: { params: { plantId: string } }
) {
	const body = await request.json();
	const deviceValidation = deviceSchema.safeParse(body);

	if (!deviceValidation.success) {
		return NextResponse.json(deviceValidation.error.errors, { status: 400 });
	}

	// Validate plant
	const plant = await prisma.plant.findUnique({
		where: { id: params.plantId },
	});
	if (!plant) {
		return NextResponse.json({ error: "Plant not found." }, { status: 404 });
	}

	const { deviceType, name, model, producent } = deviceValidation.data;

	try {
		const newDevice = await prisma.device.create({
			data: {
				name,
				deviceType,
				model,
				producent,
				plant_id: params.plantId,
			},
		});
		return NextResponse.json(newDevice, { status: 201 });
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

export async function GET(
	request: NextRequest,
	{ params }: { params: { plantId: string } }
) {
	const devices = await prisma.device.findMany({
		where: { plant_id: params.plantId },
	});
	return NextResponse.json(devices);
}
