"use server";
import { loginUserSchema } from "@/schemas/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokents";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: any) => {
	const validateUser = loginUserSchema.safeParse(values);
	if (!validateUser.success) return { error: "Invalid fields!" };

	const { email, password } = validateUser.data;

	//check if needs verification
	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
		return { error: "Email does not exists." };
	}
	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);
		return { success: "Confirmation email sent." };
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
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
