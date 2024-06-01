"use server";

import * as z from "zod";
import { auth } from "@/auth";
import { getOrganizationByName } from "@/data/organization";
import prisma from "@/prisma/client";
import { createOrgSchema } from "@/schemas/forms-schema";
import { UserRole } from "@prisma/client";

export const createOrg = async (values: z.infer<typeof createOrgSchema>) => {
	const session = await auth();
	if (!session || !session.user.id || !session.user.name) {
		return { error: "User not logged in." };
	}
	if (!session.user.organizationId || !session.user.role) {
		return { error: "Select Organization first" };
	}

	if (session.user.role === UserRole.USER)
		return { error: "You are not authorized." };

	const validateOrganization = createOrgSchema.safeParse(values);

	if (!validateOrganization.success) return { error: "Invalid name" };

	const existingUser = await prisma.user.findUnique({
		where: { id: session.user.id },
	});

	if (!existingUser) return { error: "User does not exists" };

	const { organization } = validateOrganization.data;
	const existingOrg = await getOrganizationByName(organization);
	if (existingOrg) return { error: "Organization already exists" };

	try {
		const newOrganization = await prisma.organization.create({
			data: {
				name: organization,
				members: {
					create: [
						{
							user: { connect: { id: existingUser.id } },
							role: UserRole.OWNER, // Assuming 'OWNER' is a valid role
						},
					],
				},
			},
		});
		return { success: "Organization created" };
	} catch (error) {
		console.log(error);
		return { error: "Could not create Organization" };
	}
};
