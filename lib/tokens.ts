import { getVerificationTokenByEmail } from "@/data/verification-token";
import {
	getResetTokenByEmail,
	getResetTokenByToken,
} from "@/data/pwd-reset-token";
import prisma from "@/prisma/client";
import { v4 as uuid } from "uuid";

export const generatePwdResetToken = async (email: string) => {
	const token = uuid();
	const expires = new Date(new Date().getTime() + 3600 * 1000);
	const existingToken = await getResetTokenByToken(token);
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
