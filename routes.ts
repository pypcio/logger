/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
	"/auth/login",
	"/auth/register",
	"/auth/error",
	"/auth/reset",
	"/auth/new-password",
];

/**
 * An array of routes that are accessible to authenticated users
 * These routes require authentication
 * @type {string[]}
 */
// export const privateRoutes = [""]; All routes are private by default, is defined the middleware.ts

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes. They are available to the public.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";
/**
 * The prefix for API routes
 * Distinguishing from page routes to return 401 error instead logging page. Reducing response load.
 * @type {string}
 */
export const apiPrefix: string = "/api";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";

/**
 * An array of routes, that are available after login
 * For user that doesn't have organizationID and role assigned
 * @type {string[]}
 */

export const firstLoginRoutes: string[] = [
	"/settings",
	"/settings/organizations",
	"/settings/add-organization",
	"/settings/create-organization",
	"/settings/select-organization",
];
