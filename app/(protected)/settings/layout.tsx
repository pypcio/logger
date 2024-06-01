import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import ButtonTest from "./button-test";
import { PropsWithChildren } from "react";
import { Container } from "@radix-ui/themes";
// import Link from "@/components/ui/link";

const SettingsLayout = async ({ children }: PropsWithChildren) => {
	return (
		<div className='container flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 w-full'>
			<div className='flex-1 '>{children}</div>
			{/* <Container className='w-full h-auto flex flex-col justify-center items-center'> */}
			{/* </Container> */}
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
