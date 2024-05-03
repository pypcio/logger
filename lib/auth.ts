import { auth } from "@/auth";
import prisma from "@/prisma/client";

export const currentUser = async () => {
	const session = await auth();
	return session?.user;
};

export const getUserOrganizationInfo = async () => {
	try {
		const user = await currentUser();
		if (!user) return null;
		const fetchedOrgData = await prisma.organizationMembership.findMany({
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

		return fetchedOrgData;
	} catch (error) {}
};
