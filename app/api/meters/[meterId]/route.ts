import { meterSchema } from "@/app/_validationSchemas/schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
	params: {
		plantId: string;
		inverterId: string;
	};
}

export async function PATCH(request: NextRequest, { params }: Props) {
	const body = await request.json();
	const meterValidation = meterSchema.safeParse(body);

	if (!meterValidation.success)
		return NextResponse.json(meterValidation.error.errors, { status: 400 });

	const meter = await prisma.meter.findUnique({
		where: { id: params.inverterId },
	});
	if (!meter) return NextResponse.json({ error: "Meter not found" }, { status: 404 });

	//check if new name already in use
	if (body.name) {
		const meterWithSameName = await prisma.meter.findFirst({
			where: { name: body.name, plant_id: meter.plant_id },
		});
		if (meterWithSameName)
			return NextResponse.json(
				{ error: "Name already taken. Choose another one." },
				{ status: 400 }
			);
	}

	const updatedMeter = await prisma.meter.update({
		where: { id: meter.id },
		data: {
			name: body.name,
			description: body.description,
			model: body.model,
			producent: body.producent,
		},
	});
	return NextResponse.json(updatedMeter);
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const meter = await prisma.meter.findUnique({ where: { id: params.id } });
	return NextResponse.json(meter);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const deleteMeter = await prisma.meter.delete({ where: { id: params.id } });
	return NextResponse.json({});
}
