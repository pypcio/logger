import prisma from "@/prisma/client";
import { getOrganizationByName } from "./organization";

export const getUserByEmail = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserById = async (userId: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			include: { company: { select: { name: true } } },
		});
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserMembershipInfo = async (
	userId: string,
	organizationId: string
) => {
	try {
		if (!userId || organizationId) return null;
		const fetchOrgData = await prisma.organizationMembership.findUnique({
			where: {
				userId_organizationId: {
					userId,
					organizationId,
				},
			},
			include: {
				organization: true,
			},
		});
		return fetchOrgData;
	} catch (error) {
		return null;
	}
};
