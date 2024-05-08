import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

//get user from auth
export async function GET(req: NextRequest) {
	const user = await currentUser();
	if (!user || !user.id)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	const existingUser = await prisma.user.findUnique({
		where: { id: user.id },
		include: {
			company: {
				select: {
					name: true,
				},
			},
		},
	});
	if (!existingUser) return NextResponse.json({ error: "User does not exist" });

	return NextResponse.json(existingUser);
}
