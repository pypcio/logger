import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginUserSchema } from "@/schemas/forms-schema";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		Credentials({
			async authorize(credentials) {
				const validateUser = loginUserSchema.safeParse(credentials);

				if (validateUser.success) {
					const { email, password } = validateUser.data;

					//validate password and user in Organization

					const user = await getUserByEmail(email);
					if (!user || !user.hashedPassword) return null;

					const passwordsMatch = await bcrypt.compare(
						password,
						user.hashedPassword
					);
					if (passwordsMatch) return user;
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
