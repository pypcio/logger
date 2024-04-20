"use client";
import { PiTelevisionDuotone } from "react-icons/pi";
import classnames from "classnames";
import React from "react";
import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/use-scroll";
const NavBar = () => {
	const scrolled = useScroll(5);
	const selectedLayout = useSelectedLayoutSegment();
	return (
		<nav
			className={cn(
				` lg:p-2 sticky inset-x-0 top-0 z-30 h-full transition-all border-b border-gray-200`,
				{
					"border-b border-gray-200  backdrop-blur-lg": scrolled,
					"border-b border-gray-200 ": selectedLayout,
				}
			)}>
			<Container>
				<Flex justify='between' gap='5' align='center'>
					<Flex gap='5' align='center'>
						<Link href='/'>
							<PiTelevisionDuotone size='2rem' />
						</Link>
						<NavLinks />
					</Flex>
					<Link href='/'>User</Link>
				</Flex>
			</Container>
		</nav>
	);
};

const NavLinks = () => {
	const currentPath = usePathname();
	const links: { label: string; href: string }[] = [
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Monitoring", href: "/monitoring" },
	];
	return (
		<ul className='flex space-x-6'>
			{links.map((link) => {
				return (
					<li key={link.href}>
						<Link
							className={classnames({
								"nav-link": true,
								"!text-accent-9 font-semibold": link.href === currentPath,
							})}
							href={link.href}>
							{link.label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default NavBar;
