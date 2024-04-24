import providersConfig from "@/auth.config";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig, type DefaultSession } from "next-auth";
import { getUserById } from "./data/user";
import { UserRote } from "@prisma/client";
import { userAgent } from "next/server";
declare module "next-auth" {
	interface Session {
		user: {
			role: UserRote;
		} & DefaultSession["user"];
	}
}

const authOptions = {
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				const role = token.role;
				return { ...session, user: { ...session.user, role: role } };
			}
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;
			token.role = existingUser.role;
			return token;
		},
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
