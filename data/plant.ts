import prisma from "@/prisma/client";

export const getPlantId = async (plantId: string) => {
	try {
		const plantData = await prisma.plant.findUnique({
			where: { id: plantId },
		});
		return plantData;
	} catch (error) {
		return null;
	}
};
