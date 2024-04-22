import { NextRequest, NextResponse } from "next/server";
import { loginUserSchema } from "@/schemas/schema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = loginUserSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });

	const user = await prisma.user.findUnique({
		where: { email: body.email },
	});
	if (!user)
		return NextResponse.json({ error: "User not found." }, { status: 404 });
	const isMatch = bcrypt.compare(body.password, user.hashedPassword as string);
	if (!isMatch) {
		return NextResponse.json(
			{ message: "Authentication failed: Incorrect password." },
			{ status: 401 }
		);
	}
}
