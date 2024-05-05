"use server";

import { auth, unstable_update } from "@/auth";
import { getUserWithOrgAndPlantByEmail } from "@/data/test";
import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";

export const updateUser = async (organizationId: string) => {
	const session = await auth();
	if (!session || !session.user.id) {
		//should redirect
		return { error: "Something went wrong" };
	}
	const member = await prisma.organizationMembership.findUnique({
		where: {
			userId_organizationId: {
				userId: session.user.id,
				organizationId,
			},
		},
	});
	if (!member) return { error: "You do not belong to organization" };

	await unstable_update({
		...session,
		user: {
			...session.user,
			organizationId: member.organizationId,
			role: member.role,
		},
	});

	console.log("User session updated successfully.");
};
