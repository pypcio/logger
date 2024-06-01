"use client";
import useScroll from "@/hooks/use-scroll";
import { SideNavItem } from "@/lib/types/NavItems";
import { cn } from "@/lib/utils";
import { SIDENAV_ITEMS } from "@/lib/utils/sideNavList";
import { ChevronDownIcon, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import {
	SideNavItemSchema,
	useDynamicSideNav,
} from "@/hooks/use-dynamic-sidenav";
import { PlantWithDevices } from "@/lib/services/api";
import { Icon } from "@iconify/react";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
const iconClass =
	" rounded-full absolute top-1 -right-1 lg:-right-2 center z-20  transition-colors duration-1000 ease-in-out m-0 p-0 shadow-2xl cursor-pointer hover:scale-105 w-7 h-7";

const SideNav = ({ plantId }: { plantId: string }) => {
	const scrolled = useScroll(5);
	const selectedLayout = useSelectedLayoutSegment();
	const [open, setOpen] = useState(true);
	const [itemsSideNav, isLoading] = useDynamicSideNav(plantId);
	const toggleOpen = () => setOpen(!open);
	return (
		<div
			className={cn(
				"flex flex-col h-auto bg-secondary",
				{
					"min-w-20 sm:min-w-20 md:min-w-44 lg:min-w-60": open,
					"w-10 sm:w-12 lg:w-14": !open,
				},
				open ? "animate-sidebar-open" : "animate-sidebar-close"
			)}>
			<div className={cn(" relative bg-secondary  grow")}>
				<div className='sticky top-14 pt-6 h-full'>
					{/* <div className='absolute -right-1 lg:-right-2 top-0 h-full w-2 lg:w-2 bg-secondary-foreground'></div> */}
					<Button size='icon' onClick={toggleOpen} className={iconClass}>
						<ChevronRight className={cn("h-4 w-4", { "rotate-180": open })} />
					</Button>
					<div className='flex flex-col y-2 md:px-2 lg:px-3 py-4'>
						{!isLoading ? (
							itemsSideNav?.map((item, idx) => {
								return (
									<MenuItem
										isLoading={isLoading}
										isOpen={open}
										key={idx}
										item={item}
									/>
								);
							})
						) : (
							<NavSkeleton />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideNav;

const MenuItem = ({
	item,
	isOpen,
	isLoading,
}: {
	item: SideNavItemSchema;
	isOpen: boolean;
	isLoading: boolean;
}) => {
	const pathname = usePathname();
	const [subMenuOpen, setSubMenuOpen] = useState(false);
	const toggleSubMenu = () => {
		if (isOpen) {
			setSubMenuOpen(!subMenuOpen);
		}
	};
	if (!isOpen && subMenuOpen) setSubMenuOpen(false);
	return (
		<div className=' scale-50 pr-0 md:scale-75 lg:scale-100 overflow-hidden'>
			{item.submenu ? (
				<>
					<button
						disabled={isLoading}
						onClick={toggleSubMenu}
						className={`flex flex-row pl-[3px] items-center py-1 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-muted-foreground  ${
							pathname.includes(item.path) ? "bg-zinc-100" : ""
						}`}>
						<div className='flex flex-row space-x-4 items-center'>
							<span className='m-auto'>
								<Icon icon={`lucide:${item.icon}`} width='24' height='24' />
							</span>
							<span
								className={cn(`font-medium text-base flex`, {
									" hidden": !isOpen,
									" ": isOpen,
								})}>
								{item.title}
							</span>
						</div>
						<div
							className={cn(` ${subMenuOpen ? "rotate-180" : ""} flex mr-1`, {
								" hidden": !isOpen,
								" ": isOpen,
							})}>
							<ChevronDownIcon width='12' height='12' />
						</div>
					</button>

					{subMenuOpen && isOpen && (
						<div className='my-2 ml-12 flex flex-col space-y-1 animatedSubMenu '>
							{item.subMenuItems?.map((subItem, idx) => {
								return (
									<Link
										key={idx}
										href={subItem.path}
										className={`text-sm opacity-85 ${
											subItem.path === pathname ? "font-medium" : ""
										}`}>
										<span>{subItem.title}</span>
									</Link>
								);
							})}
						</div>
					)}
					<DropdownMenuSeparator className='bg-muted-foreground' />
				</>
			) : (
				<>
					<Link
						href={item.path}
						className={`flex flex-row shrink  pl-[3px] items-center py-2 justify-between  rounded-lg hover:bg-muted-foreground ${
							item.path === pathname ? "bg-muted " : ""
						}`}>
						<div className='gap-0 flex'>
							<span>
								<Icon
									className='m-auto'
									icon={`lucide:${item.icon}`}
									width='24'
									height='24'
								/>
							</span>
							<span
								className={cn(`font-medium text-base flex shrink  pl-4`, {
									" hidden": !isOpen,
									" ": isOpen,
								})}>
								{item.title}
							</span>
						</div>
					</Link>
					<DropdownMenuSeparator className='bg-muted-foreground' />
				</>
			)}
		</div>
	);
};

const NavSkeleton = () => {
	const fakeNavList = [1, 2, 3, 4];
	return (
		<div className='flex flex-col justify-center items-center'>
			{fakeNavList.map((skeleton: number) => {
				return (
					<Skeleton
						className='w-4/5 mx-0 my-1 h-4 md:h-10 rounded-xl bg-muted-foreground'
						key={skeleton}
					/>
				);
			})}
		</div>
	);
};
