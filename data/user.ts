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
