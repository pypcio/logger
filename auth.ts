import providersConfig from "@/auth.config";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";

const authOptions = {
	pages: {
		signIn: "/auth/login",
	},
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	...providersConfig,
} satisfies NextAuthConfig;

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth(authOptions);
