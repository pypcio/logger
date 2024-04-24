"use server";
import { registerUserSchema } from "@/schemas/schema";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokents";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: any) => {
	const validateRegister = registerUserSchema.safeParse(values);
	if (!validateRegister.success) return { error: "Invalid fields!" };

	const { name, email, password } = validateRegister.data;
	const existingUser = await getUserByEmail(email);
	if (existingUser) return { error: "User already exists." };

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			email,
			hashedPassword,
			name,
		},
	});

	const verificationToken = await generateVerificationToken(newUser.email);
	await sendVerificationEmail(verificationToken.email, verificationToken.token);
	if (verificationToken) {
		return { success: "Confirmation email sent!" };
	}
	return { error: "Something went wrong" };
};
