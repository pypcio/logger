"use server";

import { signOut } from "@/auth";

export const signout = async () => {
	// Server-side actions, like clearing cookies in the client-side code,
	// before or after calling signOut().
	// ...
	await signOut();
};
