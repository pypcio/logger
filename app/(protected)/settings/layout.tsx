import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import ButtonTest from "./button-test";
import { PropsWithChildren } from "react";
import { Container } from "@radix-ui/themes";
// import Link from "@/components/ui/link";

const SettingsLayout = async ({ children }: PropsWithChildren) => {
	return (
		<div className='w-full h-full flex flex-col first-line:gap-5 justify-center items-center p-6 '>
			<Container className='w-full h-auto flex flex-col justify-center items-center'>
				{children}
			</Container>
			{/* <div className='flex gap-5'>
				<LoginButton />
				<LogoutButton />
				<ButtonTest />
			</div> */}
			{/* <Link href='/settings/select-organization'>Select Organization</Link> */}
		</div>
	);
};

export default SettingsLayout;
