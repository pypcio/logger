import { BsSpeedometer } from "react-icons/bs";
import { FaBug, FaChartArea } from "react-icons/fa";
import { MainNavItem } from "../types/NavItems";
import { IoMdSettings } from "react-icons/io";
import { RiRemoteControlFill } from "react-icons/ri";
export const MAIN_NAV_ITEMS: MainNavItem[] = [
	// {
	// 	title: "Logo",
	// 	path: "/",
	// 	icon: <FaBug width='24' height='24' />,
	// },
	// {
	// 	title: "Dashboard",
	// 	path: "/dashboard",
	// 	protected: true,
	// 	icon: <FaChartArea width='24' height='24' />,
	// },
	{
		title: "Monitoring",
		path: "/monitoring",
		protected: true,
		icon: <BsSpeedometer width='24' height='24' />,
	},
	{
		title: "Settings",
		path: "/settings",
		protected: true,
		icon: <IoMdSettings width='24' height='24' />,
	},
	{
		title: "Control",
		path: "/control-panel",
		protected: true,
		icon: <RiRemoteControlFill width='24' height='24' />,
	},
	// {
	// 	title: "Login",
	// 	path: "/auth/login",
	// 	icon: <BsSpeedometer width='24' height='24' />,
	// },
	// {
	// 	title: "Register",
	// 	path: "/auth/register",
	// 	icon: <BsSpeedometer width='24' height='24' />,
	// },
];
