"use server";
import * as z from "zod";

import { newPasswordSchema } from "@/schemas/forms-schema";
import { getResetTokenByToken } from "@/data/pwd-reset-token";
import { getUserByEmail } from "@/data/user";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

export const newPassword = async (
	values: z.infer<typeof newPasswordSchema>,
	token?: string | null
) => {
	if (!token) return { error: "Missing token!" };

	const validatedField = newPasswordSchema.safeParse(values);

	if (!validatedField.success) return { error: "Invalid fields" };

	const { password } = validatedField.data;

	const existingToken = await getResetTokenByToken(token);

	if (!existingToken) return { error: "InvalidToken!" };

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: "Token has expired!" };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) return { error: "User does not exists!" };

	const hashedPassword = await bcrypt.hash(password, 10);

	const updatedUser = await prisma.user.update({
		where: { id: existingUser.id },
		data: {
			hashedPassword,
		},
	});

	await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });

	if (!updatedUser) return { error: "Could not change password" };

	return { success: "Password changed successfully" };
};
