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
		const user = await prisma.user.findUnique({ where: { id: userId } });
		return user;
	} catch (error) {
		return null;
	}
};

export const getUserWithOrgAndPlantByEmail = async (
	email: string,
	organizationName: string
) => {
	try {
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
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
						organization: {
							select: {
								name: true, // Selects organization name
								plants: {
									take: 1, // Retrieves only the first plant
									select: {
										id: true, // Selects plant ID
										name: true, // Selects plant name
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

		return user;
	} catch (error) {
		console.error("Error fetching user with organization and plant:", error);
		throw error;
	}
};
