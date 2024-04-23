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
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		return { error: "Invalid credentials!" };
		// throw error;
	}
};
