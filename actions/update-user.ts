"use server";

import { auth } from "@/auth";
import prisma from "@/prisma/client";

export const getUserCurrentMembershipInfo = async (organizationId: string) => {
	const session = await auth();
	if (!session || !session.user.id) return { error: "User not logged in." };
	try {
		const fetchOrgData = await prisma.organizationMembership.findUnique({
			where: {
				userId_organizationId: {
					userId: session.user.id,
					organizationId,
				},
			},
			include: {
				organization: {
					select: { name: true },
				},
			},
		});
		return fetchOrgData;
	} catch (error) {
		console.log("error: ", error);
		return null;
	}
};
