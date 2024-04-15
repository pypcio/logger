"use client";
import { PiTelevisionDuotone } from "react-icons/pi";
import classnames from "classnames";
import React from "react";
import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
	return (
		<nav className='border-b py-2 mb-5 p-5'>
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
