"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
	return (
		<div>
			<Button onClick={() => signOut()}>Sign Out</Button>
		</div>
	);
};

export default LogoutButton;
