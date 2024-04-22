import { NextRequest, NextResponse } from "next/server";
import { registerUserSchema } from "@/schemas/schema";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = registerUserSchema.safeParse(body);
	if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });

	const existingUser = await prisma.user.findUnique({ where: { email: body.email } });
	if (existingUser) return NextResponse.json({ error: "User already exists." }, { status: 400 });

	const hashedPassword = await bcrypt.hash(body.password, 10);

	await prisma.user.create({
		data: {
			email: body.email,
			hashedPassword,
		},
	});
	return NextResponse.json({ email: body.email });
}
