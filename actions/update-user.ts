"use server";

import prisma from "@/prisma/client";

export const getUserCurrentMembershipInfo = async (
	userId: string,
	organizationId: string
) => {
	try {
		const fetchOrgData = await prisma.organizationMembership.findUnique({
			where: {
				userId_organizationId: {
					userId,
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
