"use client";
import { signin } from "@/actions/signin";
import { Button } from "@/components/ui/Button";

const LoginButton = () => {
	return (
		<div>
			<Button onClick={() => signin()}>Sign In</Button>
		</div>
	);
};

export default LoginButton;
