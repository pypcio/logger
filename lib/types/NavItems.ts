export type SideNavItem = {
	title: string;
	path: string;
	icon?: JSX.Element;
	submenu?: boolean;
	subMenuItems?: SideNavItem[];
};

export type MainNavItem = {
	title: string;
	path: string;
	icon?: JSX.Element;
	submenu?: boolean;
	subMenuItems?: MainNavItem[];
};

export type ProviderElement = {
	label: string;
	path: string;
	icon: JSX.Element;
};
