import { Box, Card, Flex } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";
import Socials from "@/components/auth/Socials";
import Header from "@/components/auth/Header";

const layout = ({ children }: PropsWithChildren) => {
	return (
		<Flex direction='column' height='100vh' align='center' justify='center' className='bg-accent-6'>
			<Box maxWidth='400px' width={{ initial: "80vw", sm: "350px", md: "400px" }}>
				<div className='bg-slate-100 rounded-lg shadow-lg py-8 border border-gray-200 p-4'>
					<Flex direction='column' gap='5'>
						<Header />
						{children}
						<Socials />
					</Flex>
				</div>
			</Box>
		</Flex>
	);
};

export default layout;
