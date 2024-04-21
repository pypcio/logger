"use client";
import useScroll from "@/hooks/use-scroll";
import { MAIN_NAV_ITEMS } from "@/lib/utils/mainNavList";
import { cn } from "@/lib/utils/utils";
import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Skeleton,
	Switch,
	Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { PiTelevisionDuotone } from "react-icons/pi";

const NavBar = () => {
	const scrolled = useScroll(5);
	const selectedLayout = useSelectedLayoutSegment();
	return (
		<nav
			className={cn(
				` lg:p-2 sticky inset-x-0 top-0 z-30 h-full transition-all border-b border-gray-200 bg-accent-1 opacity-1`,
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
					{/* <AuthStatus /> */}
				</Flex>
			</Container>
		</nav>
	);
};

// const AuthStatus = () => {
// 	const { status, data: session } = useSession();

// 	if (status === "loading")
// 		return (
// 			<Skeleton width='3rem' height='2rem'>
// 				<Switch size='3' defaultChecked />
// 			</Skeleton>
// 		);
// 	if (status === "unauthenticated")
// 		return (
// 			<Link className='nav-link' href='/api/auth/signin'>
// 				Sign In
// 			</Link>
// 		);
// 	return (
// 		<Box>
// 			<DropdownMenu.Root>
// 				<DropdownMenu.Trigger>
// 					<Avatar
// 						src={session!.user!.image!}
// 						fallback='?'
// 						radius='full'
// 						className='cursor-pointer'
// 						referrerPolicy='no-referrer'
// 					/>
// 				</DropdownMenu.Trigger>
// 				<DropdownMenu.Content>
// 					<DropdownMenu.Label>
// 						<Text size='2'>{session!.user!.email}</Text>
// 					</DropdownMenu.Label>
// 					<DropdownMenu.Item>
// 						<Link href='/api/auth/signout'>Sign Out</Link>
// 					</DropdownMenu.Item>
// 				</DropdownMenu.Content>
// 			</DropdownMenu.Root>
// 		</Box>
// 	);
// };

const NavLinks = () => {
	const currentPath = usePathname();
	return (
		<ul className='flex space-x-6'>
			{MAIN_NAV_ITEMS.map((link) => {
				return (
					<li key={link.path}>
						<Link
							className={classnames({
								"nav-link": true,
								"!text-accent-9 font-semibold": link.path === currentPath,
							})}
							href={link.path}>
							{link.title}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default NavBar;
