"use server";

import { auth } from "@/auth";
import { getOrganizationByName } from "@/data/organization";
import prisma from "@/prisma/client";
import { createOrgSchema } from "@/schemas/forms-schema";
import { UserRole } from "@prisma/client";

export const createOrg = async (values: any) => {
	const session = await auth();
	if (!session) return { error: "You are not authorized" };

	const { user } = session;

	const validateOrganization = createOrgSchema.safeParse(values);

	if (!validateOrganization.success) return { error: "Invalid name" };

	const existingUser = await prisma.user.findUnique({
		where: { id: user.id },
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
							user: { connect: { id: user.id } },
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
