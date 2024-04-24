import { BsSpeedometer } from "react-icons/bs";
import { FaBug, FaChartArea } from "react-icons/fa";
import { MainNavItem } from "../types/NavItems";

export const MAIN_NAV_ITEMS: MainNavItem[] = [
	{
		title: "Logo",
		path: "/",
		icon: <FaBug width='24' height='24' />,
	},
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: <FaChartArea width='24' height='24' />,
	},
	{
		title: "Monitoring",
		path: "/monitoring",
		icon: <BsSpeedometer width='24' height='24' />,
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
