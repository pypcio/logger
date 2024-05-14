"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { MainNavItem } from "@/lib/types/NavItems";
import { cn } from "@/lib/utils";
import { MAIN_NAV_ITEMS } from "@/lib/utils/mainNavList";
import classnames from "classnames";
import { LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { PiTelevisionDuotone } from "react-icons/pi";

import { ModeToggle } from "@/components/mode-toggle";

import RoleTypeBadge from "@/components/user-badge";
// import OrganizationName from "@/components/organization-name";

const NavBar = () => {
	// const scrolled = useScroll(5);
	// const selectedLayout = useSelectedLayoutSegment();
	return (
		<nav
			className={cn(
				`w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`,
				{
					// "border-b border-gray-200  backdrop-blur-lg": scrolled,
					// "border-b border-gray-200 ": selectedLayout,
				}
			)}>
			<div className='container h-14  flex justify-between items-center max-w-screen-2xl '>
				<div className='flex justify-center gap-4 items-center'>
					<Link href='/'>
						<PiTelevisionDuotone size='2rem' />
					</Link>
					<NavLinks />
				</div>
				<div className='flex gap-4'>
					<AuthStatus />
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();
	// const { data: member, isLoading } = useUserMembershipInfo();
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
				<Avatar className='w-8 h-8'>
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
				{session?.user.organizationName && session.user.role && (
					<>
						<DropdownMenuLabel>
							<p className='text-center'>
								{session?.user.organizationName || "Organization not found"}
							</p>
						</DropdownMenuLabel>
						<DropdownMenuGroup className='flex items-center mb-2'>
							<User strokeWidth={1} className='ml-2 h-4 w-4 mr-2' />
							<RoleTypeBadge
								className='text-center mb-0'
								status={session?.user.role!}
							/>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
					</>
				)}

				<DropdownMenuItem>
					<Settings strokeWidth={1} className='h-4 w-4 mr-2' />
					<Link href='/settings/user'>Setings</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<LogOut strokeWidth={1} className='h-4 w-4 mr-2' />
					<p onClick={() => signOut()}>Logout</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const NavLinks = () => {
	const { status } = useSession();
	const currentPath = usePathname();
	const [links, setLinks] = useState<MainNavItem[]>(MAIN_NAV_ITEMS);
	useEffect(() => {
		const filteredLinks = MAIN_NAV_ITEMS.filter(
			(link) =>
				!link.protected || (link.protected && status === "authenticated")
		);
		setLinks(filteredLinks);
	}, [status]);

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
