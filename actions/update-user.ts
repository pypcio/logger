"use server";

import { auth, unstable_update } from "@/auth";
import { getUserWithOrgAndPlantByEmail } from "@/data/test";

export const updateUser = async (organizationName: string) => {
	// Retrieve the session using the auth method
	const session = await auth();
	console.log("session in action: ", session);
	// Check if there is a session and the session has a user with an email
	if (!session || !session.user || !session.user.email) {
		console.log("No valid session or user email found.");
		return; // Early return if no session or no email
	}

	// Fetch user details based on the email and organization name
	const user = await getUserWithOrgAndPlantByEmail(
		session.user.email,
		organizationName
	);
	// Check if user information was successfully retrieved
	if (!user) {
		console.log("User could not be found or retrieved.");
		return;
	}
	await unstable_update({
		...session.user,
		organizationId: user.organizationId,
		plantId: user.plantId,
		role: user.role,
	} as any);
	console.log("User session updated successfully.");
};
