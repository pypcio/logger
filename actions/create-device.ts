"use server";

import * as z from "zod";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { createDeviceSchema } from "@/schemas/forms-schema";
import { UserRole } from "@prisma/client";
import { getPlantById } from "@/lib/services/api";
import { Prisma } from "@prisma/client";
export const createDevice = async (
	plantId: string,
	values: z.infer<typeof createDeviceSchema>
) => {
	const session = await auth();
	if (!session || !session.user.id || !session.user.name) {
		return { error: "User not logged in." };
	}
	if (!session.user.organizationId || !session.user.role) {
		return { error: "Select Organization first" };
	}

	if (session.user.role === UserRole.USER) {
		return { error: "You are not authorized." };
	}

	const validateDevice = createDeviceSchema.safeParse(values);

	if (!validateDevice.success) {
		return { error: "Invalid name" };
	}
	const { name, deviceType, model, producent } = validateDevice.data;

	try {
		// Check if the plant exists
		const existingPlant = await prisma.plant.findUnique({
			where: { id: plantId },
		});

		if (!existingPlant) {
			return { error: "Plant does not exist" };
		}

		// Create the device
		const newDevice = await prisma.device.create({
			data: {
				name,
				model,
				deviceType,
				plant_id: existingPlant.id,
				producent,
			},
		});

		return { success: "Device created", device: newDevice };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return { error: "Device name already in use." };
			}
			// Handle other Prisma-specific errors here
		}
		console.log(error);
		return { error: "Could not create Device" };
	}
};
