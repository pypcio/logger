import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// TO DO: modify it, so no auth is needed
export async function GET(req: NextRequest) {
	const user = await currentUser();
	if (!user || !user.id)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	try {
		const existingUser = await prisma.user.findUnique({
			where: { id: user.id },
			include: {
				company: {
					select: {
						name: true,
					},
				},
				ownedCompany: {
					select: {
						name: true,
					},
				},
			},
		});
		if (!existingUser)
			return NextResponse.json({ error: "User does not exist" });
		// Post-process to merge company information
		const resultUser = {
			...existingUser,
			company: existingUser.company || existingUser.ownedCompany || null,
		};
		const { ownedCompany, ...safeUser } = resultUser;
		return NextResponse.json(safeUser);
	} catch (error) {}
}
