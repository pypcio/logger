import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getResetTokenByEmail } from "@/data/pwd-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import prisma from "@/prisma/client";
import { v4 as uuid } from "uuid";

export const generateTwoFactorToken = async (email: string) => {
	const token = crypto.randomInt(100_000, 1_000_000).toString();
	const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

	const existingToken = await getTwoFactorTokenByEmail(email);
	if (existingToken) {
		await prisma.twoFactorToken.delete({ where: { id: existingToken.id } });
	}
	const twoFactorToken = await prisma.twoFactorToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return twoFactorToken;
};

export const generatePwdResetToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 3600 * 1000);
	const existingToken = await getResetTokenByEmail(email);
	if (existingToken) {
		await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });
	}
	const passwordResetToken = await prisma.passwordResetToken.create({
		data: {
			token,
			email,
			expires,
		},
	});
	return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);
	if (existingToken) {
		await prisma.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}
	const verificationToken = await prisma.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});
	return verificationToken;
};
