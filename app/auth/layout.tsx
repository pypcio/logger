import { Box, Flex } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";
import Socials from "@/components/auth/Socials";
import Header from "@/components/auth/Header";

const layout = ({ children }: PropsWithChildren) => {
	return (
		<div className='h-screen flex items-center justify-center bg-sky-200'>
			{children}
			{/* <Socials /> */}
		</div>
	);
};

export default layout;
