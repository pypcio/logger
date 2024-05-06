import React, { useState, useEffect } from "react";
import { usePlantWithDevices } from "@/lib/services/queries";
import { PlantWithDevices, Device } from "@/lib/services/api"; // Ensure correct import of Device
const monitoringPath = "/monitoring";

export interface SideNavItemSchema {
	title: string;
	path: string;
	icon: string;
	submenu?: boolean;
	subMenuItems?: SideNavItemSchema[];
}

export const useDynamicSideNav = (
	plantId: string
): [SideNavItemSchema[], boolean] => {
	const { data: plantData, isLoading } = usePlantWithDevices(plantId);
	const [menuItems, setMenuItems] = useState<SideNavItemSchema[]>([]);

	useEffect(() => {
		if (plantData) {
			setMenuItems(formatMenuItems(plantData));
		}
	}, [plantData]);

	const formatMenuItems = (plant: PlantWithDevices): SideNavItemSchema[] => {
		return [
			createDeviceSubNavItems("Loggers", plant.loggers, "router"),
			createDeviceSubNavItems("Inverters", plant.inverters, "zap"),
			createDeviceSubNavItems("Meters", plant.meters, "gauge"),
			createDeviceSubNavItems(
				"Security Devices",
				plant.securityDevices,
				"shield-check"
			),
		];
	};

	const createDeviceSubNavItems = (
		title: string,
		devices: Device[],
		iconName: string
	): SideNavItemSchema => ({
		title,
		path: `${monitoringPath}/${title.toLowerCase()}`,
		icon: iconName,
		submenu: devices && devices.length > 0,
		subMenuItems: devices.map((device) => ({
			title: device.name,
			path: `${monitoringPath}/${title.toLowerCase()}/${device.id}`,
			icon: iconName,
		})),
	});

	return [menuItems, isLoading];
};

// Assuming the icon component takes a name and renders the icon:
// const Icon = ({ name }) => <img src={`/icons/${name}.svg`} alt={`${name} icon`} />;
