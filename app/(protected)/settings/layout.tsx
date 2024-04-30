"use client";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import ButtonTest from "./button-test";
import { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

const SettingsLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex justify-center items-center flex-col gap-8'>
			{children}
			<div className='flex gap-5'>
				<LoginButton />
				<LogoutButton />
				<ButtonTest />
			</div>
		</div>
	);
};

export default SettingsLayout;
