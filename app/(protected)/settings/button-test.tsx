"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { updateUser } from "@/actions/update-user";

const ButtonTest = () => {
	const organizationName = "Orneta 1";
	const handleSignIn = async () => {
		try {
			await updateUser(organizationName);
		} catch (err) {
			console.error("Error during sign-in:", err);
		}
	};

	return <Button onClick={handleSignIn}>Update User</Button>;
};

export default ButtonTest;
