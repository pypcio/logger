import prisma from "@/prisma/client";

export const getOrganizationByName = async (name: string) => {
	try {
		const organization = await prisma.organization.findUnique({
			where: { name },
		});
		return organization;
	} catch (error) {
		return null;
	}
};

export const getOrganizationById = async (id: string) => {
	try {
		const organization = await prisma.organization.findUnique({
			where: { id },
		});
		return organization;
	} catch (error) {
		return null;
	}
};
