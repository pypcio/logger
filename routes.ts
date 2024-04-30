/**
 * An array of rotues that are accesible to the public
 * These routes do not require auth
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];
/**
 * An array of rotues that are used for auth
 * These routes will redirect logged in users to /settngs
 * @type {string[]}
 */
export const authRoutes = [
	"/auth/login",
	"/auth/register",
	"/auth/error",
	"/auth/reset-password",
	"/auth/new-password",
];
/**
 * The prefix for API auth routes
 * Routes that start with this prefix are used for API auth
 * @type {string}
 */
export const apiAuthPrefix = "api/auth";
/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
