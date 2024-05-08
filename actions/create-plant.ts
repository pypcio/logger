"use server";

import { auth } from "@/auth";
import {
	getOrganizationById,
	getOrganizationByName,
} from "@/data/organization";
import prisma from "@/prisma/client";
import { createPlantSchema } from "@/schemas/forms-schema";
import { UserRole } from "@prisma/client";

export const createPlant = async (values: any) => {
	const session = await auth();
	if (!session) return { error: "You are not authorized" };

	const { user } = session;

	const validatePlant = createPlantSchema.safeParse(values);

	if (!validatePlant.success) return { error: "Invalid name" };
	const { name, description } = validatePlant.data;
	//TO DO: redirect user to /settings/select-organization
	// if (!user.organizationId) return { error: "Select organization first" };
	const existingOrg = await getOrganizationById("clvqueek00002e27br1n2cheg");
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
