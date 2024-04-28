import prisma from "@/prisma/client";

export const getResetTokenByToken = async (token: string) => {
	try {
		const resetToken = await prisma.passwordResetToken.findUnique({
			where: { token },
		});
		return resetToken;
	} catch {
		return null;
	}
};

export const getResetTokenByEmail = async (email: string) => {
	try {
		const resetToken = await prisma.passwordResetToken.findFirst({
			where: { email },
		});

		return resetToken;
	} catch {
		return null;
	}
};
