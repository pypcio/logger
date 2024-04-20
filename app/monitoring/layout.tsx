import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import SideNav from "./_components/SideNav";
const Layout = ({ children }: PropsWithChildren) => {
	return (
		<Flex gap='5'>
			<SideNav />
			{children}
		</Flex>
	);
};

export default Layout;
