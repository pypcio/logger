import { auth, unstable_update } from "@/auth";
import prisma from "@/prisma/client";
import { AllMemberhipsInfo } from "./services/api";

export const currentUser = async () => {
	const session = await auth();
	if (!session) return null;
	return session?.user;
};

export const currentRole = async () => {
	const session = await auth();
	if (!session) return null;
	return session?.user.role;
};

export const getUserMembershipInfo = async () => {
	const session = await auth();
	try {
		if (!session?.user.organizationId || !session?.user.id) return null;
		const fetchOrgData = await prisma.organizationMembership.findUnique({
			where: {
				userId_organizationId: {
					userId: session?.user.id,
					organizationId: session?.user.organizationId,
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

export const getUserAllMembershipInfo = async () => {
	try {
		const user = await currentUser();
		if (!user) return null;
		const fetchOrgData = await prisma.organizationMembership.findMany({
			where: {
				userId: user.id,
			},
			include: {
				organization: {
					include: {
						plants: true,
					},
				},
			},
		});
		// Mapping to apply aliases and restructure data
		// const organizations = fetchedOrgData.map((org) => ({
		// 	organizationName: org.organization.name,
		// 	plants: org.organization.plants.map((plant) => ({
		// 		plantName: plant.name,
		// 	})),
		// }));

		return fetchOrgData;
	} catch (error) {
		return null;
	}
};

export const getUserCurrentMembershipInfo = async () => {
	try {
		const user = await currentUser();
		if (!user || !user.organizationId || user.id) return null;
		const fetchOrgData = await prisma.organizationMembership.findUnique({
			where: {
				userId_organizationId: {
					userId: user.id!,
					organizationId: user.organizationId,
				},
			},
		});
		return fetchOrgData;
	} catch (error) {
		return null;
	}
};

export const getUserCurrentMembershipInfoByOrgID = async (
	organizationId: string
) => {
	try {
		const user = await currentUser();
		if (!user || user.id) return null;
		const fetchOrgData = await prisma.organizationMembership.findUnique({
			where: {
				userId_organizationId: {
					userId: user.id!,
					organizationId,
				},
			},
		});
		return fetchOrgData;
	} catch (error) {
		return null;
	}
};
