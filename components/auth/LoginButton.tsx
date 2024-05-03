"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
	return (
		<div>
			<Button onClick={() => signIn()}>Sign In</Button>
		</div>
	);
};

export default LoginButton;
