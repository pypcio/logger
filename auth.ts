import authConfig from "@/auth.config";
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
			organizationId?: string;
			plantId?: string;
		} & DefaultSession["user"];
	}
}
declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		role: string;
		organizationId: string;
		plantId?: string;
	}
}

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
	unstable_update,
} = NextAuth({
	// secret: process.env.AUTH_SECRET,
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
			if (account?.provider !== "credentials") return true;

			const existingUser = await getUserById(user.id as string);
			if (!existingUser?.emailVerified) {
				return false;
			}

			//ADD 2FA Check
			return true;
		},
		async session({ token, session }) {
			// console.log("JWT: ", token, "session: ", session);
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.role && token.organizationId && session.user) {
				const role = token.role;
				const organizationId = token.organizationId;
				// for now optionall
				const plantId = token.plantId;
				return {
					...session,
					user: { ...session.user, role, organizationId, plantId },
				};
			}
			console.log("session in callback: ", session);
			console.log("token in callback: ", token);
			return session;
		},
		async jwt({ token, trigger, session }) {
			if (trigger === "update" && session) {
				console.log("update hej!: ", session);
				token = {
					...token,
					organizationId: session.organizationId,
					role: session.role,
					plantId: session.plantId,
				};
				return token;
			}
			// token.role = existingUser.role;
			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	...authConfig,
});
