"use server";
import * as z from "zod";
import { redirect } from "next/navigation";
import { loginUserSchema } from "@/schemas/forms-schema";
import { auth, signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import {
	generateVerificationToken,
	generateTwoFactorToken,
} from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import {
	sendVerificationEmail,
	sendTwoFactorTokenEmail,
} from "@/lib/email/mail";
import {
	getTwoFactorTokenByEmail,
	getTwoFactorTokenByToken,
} from "@/data/two-factor-token";
import prisma from "@/prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
// import { getOrganizationByName } from "@/data/organization";

export const login = async (
	values: z.infer<typeof loginUserSchema>,
	callbackUrl?: string | null
) => {
	//redirect user if session exists.
	const session = await auth();
	if (session) return redirect(`${DEFAULT_LOGIN_REDIRECT}`);

	const validateUser = loginUserSchema.safeParse(values);
	if (!validateUser.success) return { error: "Invalid fields!" };

	const { email, password, code } = validateUser.data;

	//check if Organization exists
	// const existingOrg = await getOrganizationByName(organization);
	// if (!existingOrg) return { error: "Organization does not exists" };

	//check userByEmail
	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
		return { error: "Email does not exists" };
	}
	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);

		try {
			await sendVerificationEmail(
				existingUser.name,
				verificationToken.email,
				verificationToken.token
			);
			return { success: "Confirmation email sent." };
		} catch (error) {
			return { error: "Could not send email." };
		}
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

			if (!twoFactorToken || twoFactorToken.token !== code) {
				return { error: "Invalid code!" };
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date();

			if (hasExpired) return { error: "Code expired!" };

			await prisma.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id
			);
			if (existingConfirmation) {
				await prisma.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				});
			}
			await prisma.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorTokenEmail(
				existingUser.name,
				twoFactorToken.email,
				twoFactorToken.token
			);
			return { twoFactor: true };
		}
	}

	try {
		await signIn("credentials", {
			email,
			password,
			// redirectTo: DEFAULT_LOGIN_REDIRECT,
			redirectTo: `${DEFAULT_LOGIN_REDIRECT}?fromLogin=true`,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials!" };
				default:
					return { error: "Something went wrong!" };
			}
		}

		throw error;
	}
};
