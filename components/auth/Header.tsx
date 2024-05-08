import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"],
});

interface HeaderProps {
	label: string;
	mainLabel: string;
}

const Header = ({ label, mainLabel }: HeaderProps) => {
	return (
		<div className='w-full flex flex-col gap-4 items-center'>
			<h1 className={cn("text-3xl font-semibold", font.className)}>
				{mainLabel}
			</h1>
			<p className='text-muted-foreground text-sm'>{label}</p>
		</div>
	);
};

export default Header;
