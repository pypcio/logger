import prisma from "@/prisma/client";

export const getPlantDevices = async (plantId: string) => {
	const plantData = await prisma.plant.findUnique({
		where: { id: plantId },
		include: {
			inverters: {
				select: {
					id: true,
					name: true,
				},
			},
			loggers: {
				select: {
					id: true,
					name: true,
				},
			},
			meters: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	return plantData;
};
