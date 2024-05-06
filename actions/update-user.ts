"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/client";

export const getUserCurrentMembershipInfo = async (organizationId: string) => {
	const session = await auth();
	if (!session || !session.user.id) return null;
	try {
		const fetchOrgData = await prisma.organizationMembership.findUnique({
			where: {
				userId_organizationId: {
					userId: session.user.id,
					organizationId,
				},
			},
		});
		return fetchOrgData;
	} catch (error) {
		console.log("error: ", error);
		return null;
	}
};
