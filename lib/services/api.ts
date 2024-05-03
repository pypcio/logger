import {
	Organization,
	OrganizationMembership,
	UserRole,
	Plant,
} from "@prisma/client";
import axios from "axios";
// const axiosInstance = axios.create({ baseURL: process.env.BASE_URL });
// console.log("axios: ", axiosInstance);
interface AllMemberhipsInfo {
	userId: OrganizationMembership["userId"];
	organizationId: OrganizationMembership["organizationId"];
	createdAt: OrganizationMembership["createdAt"];
	updatedAt: OrganizationMembership["updatedAt"];
	role: OrganizationMembership["role"];
	organization: {
		id: Organization["id"];
		name: Organization["name"];
		createdAt: Organization["createdAt"];
		updatedAt: Organization["updatedAt"];
		plants: Plant[];
	};
}
/**
 * Get info about all Organizations that logged in User belogs to, including Plants info
 * @type {AllMemberhipsInfo[]}
 */
export const getUserMembershipsInfo = async () => {
	return (await axios.get<AllMemberhipsInfo[]>("/api/organizations")).data;
};
