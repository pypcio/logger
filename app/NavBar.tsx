"use client";
import useScroll from "@/hooks/use-scroll";
import { MAIN_NAV_ITEMS } from "@/lib/utils/mainNavList";
import { cn } from "@/lib/utils";
import { Container, Flex } from "@radix-ui/themes";
import { Settings, LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { PiTelevisionDuotone } from "react-icons/pi";
import { useSessionUser } from "@/hooks/use-session-user";
import { useEffect, useState } from "react";
import { MainNavItem } from "@/lib/types/NavItems";
import { Skeleton } from "@/components/ui/skeleton";
import { FaUser } from "react-icons/fa";
import LogoutButton from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/button";

const NavBar = () => {
	const scrolled = useScroll(5);
	const selectedLayout = useSelectedLayoutSegment();
	return (
		<nav
			className={cn(
				` lg:p-2 sticky inset-x-0  top-0 w-full transition-all border-b border-gray-200 bg-background opacity-1`,
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
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();
	if (status === "loading") {
		return <Skeleton className='w-[100px] h-[20px] rounded-full' />;
	}
	if (status === "unauthenticated")
		return (
			<Link className='nav-link' href='/api/auth/signin'>
				Sign In
			</Link>
		);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage
						src={session!.user!.image!}
						className='cursor-pointer bg-secondary'
						referrerPolicy='no-referrer'
					/>
					<AvatarFallback>
						<FaUser />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='mx-2' align='center'>
				<DropdownMenuLabel>
					<p className='text-sm'>{session!.user!.email}</p>
				</DropdownMenuLabel>
				<DropdownMenuItem>
					<Settings strokeWidth={1} className='h-4 w-4 mr-2' />
					<Link href='/settings'>Setings</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<LogOut strokeWidth={1} className='h-4 w-4 mr-2' />
					<p onClick={() => signOut()}>Logout</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
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
	const { status } = useSession();
	const currentPath = usePathname();
	const [links, setLinks] = useState<MainNavItem[]>(MAIN_NAV_ITEMS);

	useEffect(() => {
		// This effect will re-run whenever `status` changes, ensuring links update
		const filteredLinks = MAIN_NAV_ITEMS.filter(
			(link) =>
				!link.protected || (link.protected && status === "authenticated")
		);
		setLinks(filteredLinks);
	}, [status]); // Dependency array includes `status`

	return (
		<ul className='flex space-x-6'>
			{links.map((link) => (
				<li key={link.path}>
					<Link
						className={classnames({
							"nav-link": true,
							"!text-primary font-semibold": link.path === currentPath,
						})}
						href={link.path}>
						{link.title}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavBar;
