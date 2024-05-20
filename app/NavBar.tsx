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
import { Building2, LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { PiTelevisionDuotone } from "react-icons/pi";

import { ModeToggle } from "@/components/mode-toggle";

import RoleTypeBadge from "@/components/user-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-9 w-9'>
						<AvatarImage
							src={session!.user!.image!}
							alt='user'
							referrerPolicy='no-referrer'
						/>
						<AvatarFallback>
							<FaUser />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				{session?.user.organizationName && session?.user.role && (
					<>
						<DropdownMenuLabel className='font-normal'>
							<div className='flex flex-col space-y-1'>
								<div className='flex h-5 items-center space-x-4 text-sm'>
									<p className='text-sm font-medium leading-none'>
										{session?.user.organizationName}
									</p>
									<Separator orientation='vertical' />
									<RoleTypeBadge
										className='text-sm font-medium leading-none'
										status={session?.user.role}
									/>
								</div>
								<p className='text-xs leading-none text-muted-foreground'>
									{session?.user.email || ""}
								</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				)}

				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User strokeWidth={1} className='h-4 w-4 mr-2' />
						<Link href='/settings/user'>Profile</Link>
					</DropdownMenuItem>
					{/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
					<DropdownMenuItem>
						<Settings strokeWidth={1} className='h-4 w-4 mr-2' />
						<Link href='/settings/user'>Settings</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Building2 strokeWidth={1} className='h-4 w-4 mr-2' />
						<Link href='/settings/select-organization'>Organization</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut strokeWidth={1} className='h-4 w-4 mr-2' />
					<p onClick={() => signOut()}>Log out</p>
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
