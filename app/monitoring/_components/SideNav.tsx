"use client";
import { Box, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { SIDENAV_ITEMS } from "@/lib/utils/sideNavList";
import { SideNavItem } from "@/lib/types/NavItems";
import { ChevronDownIcon } from "@radix-ui/themes";
import classnames from "classnames";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
const iconClass =
	" border border-x-gray-300 border-gray h-14 sm:h-16 md:h-20 w-2 lg:w-3 absolute inset-y-1/3 -right-1 lg:-right-2 rounded bg-white center hover:bg-slate-100 transition-colors duration-1000 ease-in-out m-0 p-0 shadow-2xl cursor-pointer hover:scale-105";

const SideNav = () => {
	const scrolled = useScroll(5);
	const selectedLayout = useSelectedLayoutSegment();
	const [open, setOpen] = useState(true);
	const toggleOpen = () => setOpen(!open);
	return (
		<div className=' inset-x-0 top-12 h-1/4  sticky  transition-all border-b border-gray-200'>
			<div
				className={cn("bg-secondary  h-screen", "duration-500 ease-in-out ", {
					"max-w-20 sm:max-w-20 md:max-w-44 lg:max-w-52": open,
					"max-w-10 sm:max-w-12  lg:max-w-14": !open,
				})}>
				<div className='h-full relative pt-4'>
					<div className='absolute -right-1 lg:-right-2 top-0 h-full w-1 lg:w-2 bg-secondary-foreground'></div>
					<button onClick={toggleOpen} className={iconClass}>
						<ChevronIcon isOpen={open} />
					</button>
					<div className='flex flex-col space-y-2 px-0  md:px-2 '>
						{SIDENAV_ITEMS.map((item, idx) => {
							return <MenuItem isOpen={open} key={idx} item={item} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => {
	const svgPath = isOpen
		? "M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
		: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z";

	return (
		<span className='relative' style={{ right: 2, top: 1 }}>
			<svg
				width='20'
				height='20'
				viewBox='0 0 25 25'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path d={svgPath} fill='gray' />
			</svg>
		</span>
	);
};

export default SideNav;

const MenuItem = ({ item, isOpen }: { item: SideNavItem; isOpen: boolean }) => {
	const pathname = usePathname();
	const [subMenuOpen, setSubMenuOpen] = useState(false);
	const toggleSubMenu = () => {
		if (isOpen) {
			setSubMenuOpen(!subMenuOpen);
		}
	};
	if (!isOpen && subMenuOpen) setSubMenuOpen(false);
	return (
		<div className=' scale-50 pr-0 md:scale-75 md:pr-1 lg:scale-100 lg:pr-2 overflow-hidden'>
			{item.submenu ? (
				<>
					<button
						onClick={toggleSubMenu}
						className={`flex flex-row items-center p-1 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
							pathname.includes(item.path) ? "bg-zinc-100" : ""
						}`}>
						<div className='flex flex-row space-x-4 items-center'>
							<span>{item.icon}</span>
							<span
								className={cn(`font-semibold text-base flex`, {
									"transition-width duration-300 ease-in-out scale-0": !isOpen,
									"transition-width duration-300 ease-in-out scale-1": isOpen,
								})}>
								{item.title}
							</span>
						</div>
						<div
							className={cn(` ${subMenuOpen ? "rotate-180" : ""} flex`, {
								"transition-width duration-300 ease-in-out scale-0": !isOpen,
								"transition-width duration-300 ease-in-out scale-1": isOpen,
							})}>
							<ChevronDownIcon width='12' height='12' />
						</div>
					</button>

					{subMenuOpen && isOpen && (
						<div className='my-2 ml-12 flex flex-col space-y-1 animatedSubMenu'>
							{item.subMenuItems?.map((subItem, idx) => {
								return (
									<Link
										key={idx}
										href={subItem.path}
										className={`text-sm ${
											subItem.path === pathname ? "font-bold" : ""
										}`}>
										<span>{subItem.title}</span>
									</Link>
								);
							})}
						</div>
					)}
				</>
			) : (
				<Link
					href={item.path}
					className={`flex flex-row shrink  space-x-4 items-center py-2 px-1 rounded-lg hover:bg-zinc-100 ${
						item.path === pathname ? "bg-zinc-100" : ""
					}`}>
					<Flex gap='0'>
						<span>{item.icon}</span>
						<span
							className={cn(`font-semibold text-base flex shrink  pl-4`, {
								"transition-width duration-300 ease-in-out scale-0": !isOpen,
								"transition-width duration-300 ease-in-out scale-1": isOpen,
							})}>
							{item.title}
						</span>
					</Flex>
				</Link>
			)}
		</div>
	);
};
