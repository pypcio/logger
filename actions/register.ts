"use server";
import { registerUserSchema } from "@/schemas/schema";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export const register = async (values: any) => {
	const validateRegister = registerUserSchema.safeParse(values);
	if (!validateRegister.success) return { error: "Invalid fields!" };

	const { name, email, password } = validateRegister.data;
	const existingUser = await getUserByEmail(email);
	if (existingUser) return { error: "User already exists." };

	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.user.create({
		data: {
			email,
			hashedPassword,
			name,
		},
	});
	return { success: "Email registered!" };
};
