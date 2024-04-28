import { inverterSchema } from "@/schemas/api-schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { inverterId: string } }
) {
	const body = await request.json();
	const inverterValidation = inverterSchema.safeParse(body);

	if (!inverterValidation.success)
		return NextResponse.json(inverterValidation.error.errors, { status: 400 });

	const inverter = await prisma.inverter.findUnique({
		where: { id: params.inverterId },
	});
	if (!inverter)
		return NextResponse.json({ error: "Inverter not found" }, { status: 404 });

	//check if new name already in use
	if (body.name) {
		const inverterWithSameName = await prisma.inverter.findFirst({
			where: { name: body.name, plant_id: inverter.plant_id },
		});
		if (inverterWithSameName)
			return NextResponse.json(
				{ error: "Name already taken. Choose another one." },
				{ status: 400 }
			);
	}

	const updatedInverter = await prisma.inverter.update({
		where: { id: inverter.id },
		data: {
			name: body.name,
			description: body.description,
			model: body.model,
			producent: body.producent,
		},
	});
	return NextResponse.json(updatedInverter);
}

export async function GET(
	request: NextRequest,
	{ params }: { params: { inverterId: string } }
) {
	const inverter = await prisma.inverter.findUnique({
		where: { id: params.inverterId },
	});
	return NextResponse.json(inverter);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { inverterId: string } }
) {
	const deletedInverter = await prisma.inverter.delete({
		where: { id: params.inverterId },
	});
	return NextResponse.json({});
}
