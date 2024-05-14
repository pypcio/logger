import authConfig from "@/auth.config";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig, type DefaultSession } from "next-auth";
import { getUserById } from "@/data/user";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

declare module "next-auth" {
	interface Session {
		user: {
			role?: UserRole | null;
			organizationId?: string | null;
			company?: string | null;
			organizationName: string | null;
		} & DefaultSession["user"];
	}
}
declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		role?: UserRole | null;
		organizationId?: string | null;
		organizationName: string | null;
		company?: string | null;
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
			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id
				);
				if (!twoFactorConfirmation) return false;

				//Delete two factor confirmation for next sign in

				await prisma.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				});
			}
			return true;
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (
				token.organizationId &&
				token.role &&
				session.user &&
				token.organizationName
			) {
				session.user.organizationId = token.organizationId;
				session.user.organizationName = token.organizationName;
				session.user.role = token.role as UserRole;
			}
			if (token.company && session.user) {
				session.user.company = token.company;
			}
			return session;
		},
		async jwt({ token, trigger, session }) {
			if (trigger === "update" && session) {
				token.organizationId = session.user.organizationId;
				token.organizationName = session.user.organizationName;
				token.role = session.user.role;
			}
			// token.role = existingUser.role;
			if (!token.sub || token.company) return token;

			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			token.company = existingUser.company?.name;

			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	...authConfig,
});
