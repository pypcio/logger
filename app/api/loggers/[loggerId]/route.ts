import { loggerSchema } from "@/schemas/api-schema";
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
	const loggerValidation = loggerSchema.safeParse(body);

	if (!loggerValidation.success)
		return NextResponse.json(loggerValidation.error.errors, { status: 400 });

	const logger = await prisma.logger.findUnique({
		where: { id: params.inverterId },
	});
	if (!logger)
		return NextResponse.json({ error: "Logger not found" }, { status: 404 });

	//check if new name already in use
	if (body.name) {
		const loggerWithSameName = await prisma.logger.findFirst({
			where: { name: body.name, plant_id: logger.plant_id },
		});
		if (loggerWithSameName)
			return NextResponse.json(
				{ error: "Name already taken. Choose another one." },
				{ status: 400 }
			);
	}

	const updatedLogger = await prisma.logger.update({
		where: { id: logger.id },
		data: {
			name: body.name,
			description: body.description,
			model: body.model,
			producent: body.producent,
		},
	});
	return NextResponse.json(updatedLogger);
}

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const logger = await prisma.logger.findUnique({ where: { id: params.id } });
	return NextResponse.json(logger);
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const deletedLogger = await prisma.logger.delete({
		where: { id: params.id },
	});
	return NextResponse.json({});
}
