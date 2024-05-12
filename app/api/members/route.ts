import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const user = await currentUser();
		if (!user || !user.id || !user.organizationId)
			return NextResponse.json(
				{ error: "You are not logged in" },
				{ status: 401 }
			);

		const member = await prisma.organizationMembership.findUnique({
			where: {
				userId_organizationId: {
					userId: user.id,
					organizationId: user.organizationId,
				},
			},
			include: {
				organization: true,
			},
		});
		if (!member) {
			return NextResponse.json({ error: "Member not found" }, { status: 404 });
		}
		return NextResponse.json(member, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 400 }
		);
	}
}
