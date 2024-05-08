import {
	Organization,
	OrganizationMembership,
	UserRole,
	Plant,
	Inverter,
	User,
} from "@prisma/client";
import axios from "axios";

export interface Device {
	id: string;
	name: string;
}
export interface PlantWithDevices extends Plant {
	inverters: Device[];
	meters: Device[];
	loggers: Device[];
	securityDevices: Device[];
}

interface AllMemberhipsInfo {
	userId: OrganizationMembership["userId"];
	organizationId: OrganizationMembership["organizationId"];
	createdAt: OrganizationMembership["createdAt"];
	updatedAt: OrganizationMembership["updatedAt"];
	role: OrganizationMembership["role"];
	organization: {
		id: Organization["id"];
		name: Organization["name"];
		plants: Plant[];
	};
}

interface UserWithComapny extends User {
	company: {
		name: string;
	};
}
/**
 * Get info about all Organizations that logged in User belogs to, including Plants info
 *
 * @returns
 */
export const getUserMembershipsInfo = async () => {
	return (await axios.get<AllMemberhipsInfo[]>("/api/organizations")).data;
};
/**
 * Get Plant by ID
 * @param plantId
 * @returns
 */
export const getPlantById = async (plantId: string) => {
	return (await axios.get<Plant>(`/api/plants/${plantId}`)).data;
};

/**
 * Get Every device that belongs to Plant by PlantID
 * @param plantId
 * @returns
 */
export const getPlantWithDevicesById = async (plantId: string) => {
	return (await axios.get<PlantWithDevices>(`/api/plants/${plantId}/devices`))
		.data;
};

/**
 * Get User info using session cookie- no ID needed
 * @returns
 */
export const getUserByAuth = async () => {
	const data = (await axios.get<UserWithComapny>(`/api/users`)).data;
	console.log("data: ", data);
	return data;
};
