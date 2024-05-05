"use client";
import { Container, Flex } from "@radix-ui/themes";
import { PropsWithChildren, useState } from "react";
import SideNav from "@/components/monitoring/nav-sidebar";
import { usePlantWithDevices } from "@/lib/services/queries";
import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
	params: { plantId: string };
}

const Layout = ({ children, params: { plantId } }: Props) => {
	const [open, setOpen] = useState(true);
	return (
		<div
			className='flex w-full h-full'
			// style={{ height: `calc(100vh - var(--navbar-height))` }}
		>
			<SideNav plantId={plantId} />
			{children}
		</div>
	);
};

export default Layout;
