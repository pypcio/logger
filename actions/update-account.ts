"use server";
import * as z from "zod";
import { accountFormSchema } from "@/schemas/forms-schema";
import { auth } from "@/auth";
import prisma from "@/prisma/client";

export const updateAccount = async (
	values: z.infer<typeof accountFormSchema>
) => {
	const session = await auth();
	if (!session || !session.user.id || !session.user.name)
		return { error: "User not logged in." };

	const validateAccount = accountFormSchema.safeParse(values);
	if (!validateAccount.success) return { error: "Invalid fields!" };

	const { name } = validateAccount.data;

	try {
		const existingUser = await prisma.user.findFirst({
			where: { name },
		});
		if (existingUser) return { error: "Name already in use!" };

		const updateUser = await prisma.user.update({
			where: { id: session.user.id },
			data: { name },
		});
		if (!updateUser) return { error: "Something went wrong." };
		return { success: "Account updated." };
	} catch (error) {
		return { error: "Something went wrong." };
	}
};
