"use client";
import { Button } from "@/components/ui/Button";
import { signout } from "@/actions/signout";
import React from "react";

const LogoutButton = () => {
	return (
		<div>
			<Button
				onClick={() => {
					signout();
				}}>
				Sign Out
			</Button>
		</div>
	);
};

export default LogoutButton;
