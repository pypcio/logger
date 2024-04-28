"use client";
// import { auth } from "../../../auth";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import ButtonTest from "./button-test";
import { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

const SettingsLayout = ({ children }: PropsWithChildren) => {
	const session = useSession();

	return (
		<div className='flex justify-center items-center flex-col gap-8'>
			<div>{JSON.stringify(session.data)}</div>
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
