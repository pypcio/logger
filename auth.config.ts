import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginUserSchema } from "@/schemas/schema";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validateUser = loginUserSchema.safeParse(credentials);

				if (validateUser.success) {
					const { email, password } = validateUser.data;
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
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
} satisfies NextAuthConfig;
