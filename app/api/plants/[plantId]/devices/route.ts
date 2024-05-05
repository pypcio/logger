import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { plantId: string } }
) {
	const plantSubMenu = await prisma.plant.findUnique({
		where: { id: params.plantId },
		include: {
			inverters: {
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
			loggers: {
				select: {
					id: true,
					name: true,
				},
			},
			securityDevices: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
	return NextResponse.json(plantSubMenu);
}
