import prisma from "@/prisma/client";

// export const addPropsToToken = async (email: string) => {
// 	try {
// 		const getUser = await getUserWithOrgAndPlantByEmail(email);
// 	} catch (error) {
// 		return null;
// 	}
// };

export const getUserWithOrgAndPlantByEmail = async (
	email: string,
	organizationName: string
) => {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				name: true, // Selects user name
				email: true, // Selects user email
				hashedPassword: true,
				organizationMemberships: {
					where: {
						organization: {
							name: organizationName,
						},
					},
					select: {
						role: true,
						organization: {
							select: {
								id: true, // Selects organization ID
								plants: {
									take: 1, // Retrieves only the first plant
									select: {
										id: true, // Selects plant ID
									},
								},
							},
						},
					},
				},
			},
		});

		if (!user) {
			return null; // User not found
		}

		// Flatten the organization and plant details into direct fields
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			hashedPassword: user.hashedPassword,
			organizationId:
				user.organizationMemberships.length > 0
					? user.organizationMemberships[0].organization.id
					: null,
			role:
				user.organizationMemberships.length > 0
					? user.organizationMemberships[0].role
					: null,
			plantId:
				user.organizationMemberships.length > 0 &&
				user.organizationMemberships[0].organization.plants.length > 0
					? user.organizationMemberships[0].organization.plants[0].id
					: null,
		};
	} catch (error) {
		console.error("Error fetching user with organization and plant:", error);
		throw error;
	}
};
