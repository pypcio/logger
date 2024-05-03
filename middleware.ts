import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
	apiPrefix,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isAuthorized = !!req.auth;

	const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	// console.log("isApiAuthRoute: ", isApiAuthRoute);
	// console.log("isPublicRoute: ", isPublicRoute);
	// console.log("isAuthRoute: ", isAuthRoute);
	// console.log("isAuthorized", isAuthorized);
	if (isApiAuthRoute) {
		return;
	}
	if (isApiRoute && !isAuthorized) {
		// For API routes, if the user is not authorized, return a JSON error response instead of redirecting
		return new Response(JSON.stringify({ error: "User not authorized" }), {
			status: 401,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	if (isAuthRoute) {
		if (isAuthorized) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return;
	}

	if (!isAuthorized && !isPublicRoute) {
		let callbackUrl = nextUrl.pathname;

		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return Response.redirect(
			new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
		);
	}

	return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
