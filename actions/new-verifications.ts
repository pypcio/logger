"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import prisma from "@/prisma/client";

export const newVerification = async (token: string) => {
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: "Token does not exisit!" };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: "Token has expired!" };
	}

	const exisintUser = await getUserByEmail(existingToken.email);

	if (!exisintUser) {
		return { error: "Email does not exisit" };
	}

	await prisma.user.update({
		where: { id: exisintUser.id },
		data: {
			emailVerified: new Date(),
			email: existingToken.email,
		},
	});
	await prisma.verificationToken.delete({ where: { id: existingToken.id } });
	return { success: "Email verified" };
};
