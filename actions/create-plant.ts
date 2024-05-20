"use server";

import * as z from "zod";
import { auth } from "@/auth";
import {
	getOrganizationById,
	getOrganizationByName,
} from "@/data/organization";
import prisma from "@/prisma/client";
import { createPlantSchema } from "@/schemas/forms-schema";
import { UserRole } from "@prisma/client";

export const createPlant = async (
	values: z.infer<typeof createPlantSchema>
) => {
	const session = await auth();
	if (!session || !session.user.id || !session.user.name) {
		return { error: "User not logged in." };
	}
	if (!session.user.organizationId || !session.user.role) {
		return { error: "Select Organization first" };
	}

	if (session.user.role === UserRole.USER)
		return { error: "You are not authorized." };

	const validatePlant = createPlantSchema.safeParse(values);

	if (!validatePlant.success) return { error: "Invalid name" };
	const { name, description } = validatePlant.data;
	//TO DO: redirect user to /settings/select-organization
	// if (!user.organizationId) return { error: "Select organization first" };

	const existingOrg = await getOrganizationById(session.user.organizationId);

	if (!existingOrg) return { error: "Organization does not exist" };

	// if (user.role === UserRole.USER || !user.role)
	// 	return {
	// 		error: `You don't have permission. Contact ${existingOrg.name} administrator`,
	// 	};

	try {
		const newPlant = await prisma.plant.create({
			data: {
				name,
				description,
				organizationId: existingOrg.id,
			},
		});
		return { success: "Plant created" };
	} catch (error) {
		console.log(error);
		return { error: "Could not create Plant" };
	}
};
