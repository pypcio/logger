import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import SideNav from "@/components/monitoring/nav-sidebar";
const Layout = ({ children }: PropsWithChildren) => {
	return (
		<Flex gap='5'>
			<SideNav />
			{children}
		</Flex>
	);
};

export default Layout;
