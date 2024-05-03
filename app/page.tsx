"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
export default function Home() {
	return (
		<div>
			<Button onClick={() => signIn()}>Sign In</Button>
			<Button onClick={() => signOut()}>Sign Out</Button>
		</div>
	);
}
