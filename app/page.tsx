"use client";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { signIn } from "next-auth/react";
export default function Home() {
	return (
		<div>
			<Button variant={"outline"} onClick={() => signIn()}>
				Sign In
			</Button>
		</div>
	);
}
