import providersConfig from "@/auth.config";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig, type DefaultSession } from "next-auth";
import { getUserById } from "./data/user";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import { userAgent } from "next/server";

declare module "next-auth" {
	interface Session {
		user: {
			role: UserRole;
			organization: string;
			plant: string;
		} & DefaultSession["user"];
	}
}

const authOptions = {
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	events: {
		async linkAccount({ user }) {
			await prisma.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			console.log("wchodze do signIn", user);
			if (account?.provider !== "credentials") return true;

			const existingUser = await getUserById(user.id as string);

			if (!existingUser?.emailVerified) {
				return false;
			}

			//ADD 2FA Check
			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				const role = token.role;
				return { ...session, user: { ...session.user, role } };
			}
			return session;
		},
		async jwt({ token }) {
			if (!token.sub) return token;
			const existingUser = await getUserById(token.sub);

			if (!existingUser) return token;
			token.role = "USER";
			// token.role = existingUser.role;
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
