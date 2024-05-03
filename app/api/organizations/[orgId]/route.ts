import { organizationSchema, plantSchema } from "@/schemas/api-schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { plantId: string } }
) {
	const body = await request.json();
	const organizationValidation = organizationSchema.safeParse(body);

	if (!organizationValidation.success)
		return NextResponse.json(organizationValidation.error.errors, {
			status: 400,
		});

	const organization = await prisma.plant.findUnique({
		where: { id: params.plantId },
	});
	// if (!plant)
	// 	return NextResponse.json({ error: "plant not found" }, { status: 404 });

	//check if plant with new name exists in a plant group (and and update when ORG introduced)
	// if (body.name) {
	// 	const checkPlantName = await prisma.plant.findFirst({ where: { name: body.name } });
	// 	if (checkPlantName)
	// 		return NextResponse.json(
	// 			{ error: "Name already in use. Choose different one." },
	// 			{ status: 400 }
	// 		);
	// }

	const updatedPlant = await prisma.plant.update({
		where: { id: params.plantId },
		data: {
			name: body.name,
			description: body.description,
		},
	});

	return NextResponse.json(updatedPlant);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { plantId: string } }
) {
	const deletePlant = await prisma.plant.delete({
		where: { id: params.plantId },
	});

	return NextResponse.json({});
}
