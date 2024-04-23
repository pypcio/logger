"use server";
import { loginUserSchema } from "@/schemas/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: any) => {
	const validateUser = loginUserSchema.safeParse(values);
	if (!validateUser.success) return { error: "Invalid fields!" };

	const { email, password } = validateUser.data;
	try {
		console.log(email, password);
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
