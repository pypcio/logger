import { SideNavItem } from "../types/NavItems";
import {
	HomeIcon,
	FileIcon,
	QuestionMarkCircledIcon,
	EnvelopeClosedIcon,
	GearIcon,
} from "@radix-ui/react-icons";

export const SIDENAV_ITEMS: SideNavItem[] = [
	{
		title: "Home",
		path: "/",
		icon: <HomeIcon width='24' height='24' />,
	},
	{
		title: "Projectsasdasdassssssss",
		path: "/projects",
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
