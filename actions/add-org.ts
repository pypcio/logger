"use server";

import { auth } from "@/auth";
import { getOrganizationByName } from "@/data/organization";
import prisma from "@/prisma/client";
import { addOrgSchema } from "@/schemas/forms-schema";
import { UserRole } from "@prisma/client";
import { connect } from "http2";

export const addOrg = async (values: any) => {
	const session = await auth();
	if (!session) return { error: "You are not authorized" };

	const { user } = session;
	const validateOrganization = addOrgSchema.safeParse(values);

	if (!validateOrganization.success) return { error: "Invalid name" };

	const existingUser = await prisma.user.findUnique({
		where: { id: user.id },
	});

	if (!existingUser) return { error: "User does not exists" };

	const { organization } = validateOrganization.data;
	const existingOrg = await getOrganizationByName(organization);
	if (!existingOrg) return { error: "Organization does not exists" };

	try {
		const addMemberToOrganization = await prisma.organizationMembership.create({
			data: {
				organization: { connect: { id: existingOrg.id } },
				user: { connect: { id: existingUser.id } },
			},
		});
		return { success: "Added to organization" };
	} catch (error) {
		console.log(error);
		return { error: "Could not add to Organization" };
	}
};
