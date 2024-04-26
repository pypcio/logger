"use server";
import { loginUserSchema } from "@/schemas/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokents";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { getOrganizationByName } from "@/data/organization";

export const login = async (values: any) => {
	const validateUser = loginUserSchema.safeParse(values);
	if (!validateUser.success) return { error: "Invalid fields!" };

	const { organization, email, password } = validateUser.data;

	//check if Organization exists
	const existingOrg = await getOrganizationByName(organization);
	if (!existingOrg) return { error: "Organization does not exists" };

	//check if needs verification
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
				verificationToken.email,
				verificationToken.token
			);
			return { success: "Confirmation email sent." };
		} catch (error) {
			return { error: "Could not send email." };
		}
	}

	try {
		await signIn("credentials", {
			organization,
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
