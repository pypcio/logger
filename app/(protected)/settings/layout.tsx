"use client";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import ButtonTest from "./button-test";
import { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import { Container } from "@radix-ui/themes";

const SettingsLayout = ({ children }: PropsWithChildren) => {
	return (
		<Container className='flex flex-col h-full gap-5 justify-center items-center w-[60%]'>
			{children}
			{/* <div className='flex gap-5'>
				<LoginButton />
				<LogoutButton />
				<ButtonTest />
			</div> */}
		</Container>
	);
};

export default SettingsLayout;
