import dynamic from "next/dynamic";
import { SideNavItem } from "../types/NavItems";
import {
	HomeIcon,
	FileIcon,
	QuestionMarkCircledIcon,
	EnvelopeClosedIcon,
	GearIcon,
} from "@radix-ui/react-icons";

const monitoringPath = "/monitoring";

// const fetchedSubMenu = {...some logic}

export const SIDENAV_ITEMS: SideNavItem[] = [
	{
		title: "Plant",
		path: `${monitoringPath}/plant`,
		icon: <HomeIcon width='24' height='24' />,
		submenu: true,
		subMenuItems: [
			{ title: "All", path: "/projects" },
			{ title: "Web Design", path: "/projects/web-design" },
			{ title: "Graphic Design", path: "/projects/graphic-design" },
		],
	},
	{
		title: "Loggers",
		path: `${monitoringPath}/loggers`,
		icon: <FileIcon width='24' height='24' />,
		submenu: true,
		subMenuItems: [
			{ title: "All", path: "/projects" },
			{ title: "Web Design", path: "/projects/web-design" },
			{ title: "Graphic Design", path: "/projects/graphic-design" },
		],
	},
	{
		title: "Messages",
		path: "/messages",
		icon: <EnvelopeClosedIcon width='24' height='24' />,
	},
	{
		title: "Settings",
		path: "/settings",
		icon: <GearIcon width='24' height='24' />,
		submenu: true,
		subMenuItems: [
			{ title: "Account", path: "/settings/account" },
			{ title: "Privacy", path: "/settings/privacy" },
		],
	},
	{
		title: "Help",
		path: "/help",
		icon: <QuestionMarkCircledIcon width='24' height='24' />,
	},
];
