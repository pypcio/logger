"use server";

import { signIn } from "@/auth";

export const signin = async (
	provider: string,
	{ redirectTo }: { redirectTo: string }
) => {
	// Server-side actions, like clearing cookies in the client-side code,
	// before or after calling signOut().
	// ...

	await signIn(provider, { redirectTo });
};
