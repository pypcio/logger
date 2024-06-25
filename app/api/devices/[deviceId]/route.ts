import { deviceSchema } from "@/schemas/api-schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

interface Props {
	params: {
		plantId: string;
		deviceId: string;
	};
}

export async function PATCH(request: NextRequest, { params }: Props) {
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
	const deviceValidation = deviceSchema.safeParse(body);

	if (!deviceValidation.success)
		return NextResponse.json(deviceValidation.error.errors, { status: 400 });

	const device = await prisma.device.findUnique({
		where: { id: params.deviceId },
	});
	if (!device)
		return NextResponse.json({ error: "Device not found" }, { status: 404 });

	try {
		//check if new name already in use
		if (body.name) {
			const deviceWithSameName = await prisma.device.findFirst({
				where: { name: body.name, plant_id: device.plant_id },
			});
			if (deviceWithSameName)
				return NextResponse.json(
					{ error: "Name already taken. Choose another one." },
					{ status: 400 }
				);
		}

		const updateDevce = await prisma.device.update({
			where: { id: device.id },
			data: {
				name: body.name,
				model: body.model,
				producent: body.producent,
			},
		});
		return NextResponse.json(updateDevce);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest, { params }: Props) {
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
	try {
		const device = await prisma.device.findUnique({
			where: { id: params.deviceId },
		});
		return NextResponse.json(device);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest, { params }: Props) {
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
	try {
		const deletedDevice = await prisma.device.delete({
			where: { id: params.deviceId },
		});
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500 }
		);
	}
}
