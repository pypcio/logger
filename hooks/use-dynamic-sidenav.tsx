import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Icon from "@/components/ui/icon-lucide";
import { SideNavItem } from "@/lib/types/NavItems";

const monitoringPath = "/monitoring";

interface SubMenu {
	data: {
		plant: { items: SideNavItem[] };
		logger: { items: SideNavItem[] };
		meter: { items: SideNavItem[] };
		inverter: { items: SideNavItem[] };
		securityDevices: { items: SideNavItem[] };
	};
}

export const useDynamicSideNav = () => {
	const { data: session } = useSession();
	const [menuItems, setMenuItems] = useState<SideNavItem[]>();

	useEffect(() => {
		if (session?.user?.plant) {
			const fetchMenuItems = async (plantId: string) => {
				try {
					const response = await axios.get<SubMenu>(
						`/api/plant/${plantId}/submenu`
					);
					const data = response.data;
					setMenuItems(formatMenuItems(data));
				} catch (error) {
					console.error("Failed to fetch menu items:", error);
				}
			};

			fetchMenuItems(session.user.plant);
		}
	}, [session]);

	const formatMenuItems = ({
		data: { plant, meter, logger, securityDevices, inverter },
	}: SubMenu) => {
		return [
			{
				title: "Plant",
				path: `${monitoringPath}/plant`,
				icon: <Icon name='factory' width='24' height='24' stroke='1px' />,
				submenu: plant.items.length > 0,
				subMenuItems: plant.items,
			},
			{
				title: "Logger",
				path: `${monitoringPath}/logger`,
				icon: <Icon name='router' width='24' height='24' stroke='1px' />,
				submenu: logger.items.length > 0,
				subMenuItems: logger.items,
			},
			{
				title: "Meter",
				path: "/meter",
				icon: <Icon name='gauge' width='24' height='24' stroke='1px' />,
				submenu: meter.items.length > 0,
				subMenuItems: meter.items,
			},
			{
				title: "Inverter",
				path: "/inverter",
				icon: <Icon name='zap' width='24' height='24' stroke='1px' />, // Assuming the same icon for simplicity
				submenu: inverter.items.length > 0,
				subMenuItems: inverter.items,
			},
			{
				title: "Security",
				path: "/security",
				icon: <Icon name='shield-check' width='24' height='24' stroke='1px' />,
				submenu: securityDevices.items.length > 0,
				subMenuItems: securityDevices.items,
			},
		];
	};

	return menuItems;
};
