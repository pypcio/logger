import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
	apiPrefix,
	firstLoginRoutes,
} from "@/routes";
import { getCsrfToken } from "next-auth/react";

// const { auth } = NextAuth(authConfig);
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	const isAssignedToOrg = !!req.auth?.user.organizationId;

	const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	const isFirstLoginRoute = firstLoginRoutes.includes(nextUrl.pathname);
	// console.log("isAuthRoutes: ", isAuthRoute);
	// console.log(
	// 	"isLoggedIn: ",
	// 	isLoggedIn,
	// 	"isFirstLoginRoute: ",
	// 	isFirstLoginRoute,
	// 	"isAssignedToOrg: ",
	// 	isAssignedToOrg
	// );
	// API authentication specific routes, continue without intervention
	if (isApiAuthRoute) {
		return;
	}

	// API route access control
	if (isApiRoute && !isLoggedIn) {
		return new NextResponse(JSON.stringify({ error: "User not authorized" }), {
			status: 401,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	// Redirect authorized users trying to access auth routes to default login redirect
	if (isAuthRoute) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return;
	}

	// Redirect unauthorized users trying to access non-public routes to login
	if (!isLoggedIn && !isPublicRoute) {
		const callbackUrl = nextUrl.pathname + (nextUrl.search || "");
		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return NextResponse.redirect(
			new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
		);
	}

	if (isLoggedIn && isApiRoute) {
		return;
	}

	if (isLoggedIn && !isAssignedToOrg && !isFirstLoginRoute) {
		return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
	}

	return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
