import { auth } from "@/auth";
import { z } from "zod";
import {
	Organization,
	OrganizationMembership,
	UserRole,
	Plant,
	Inverter,
	User,
	Action,
	Event,
} from "@prisma/client";
import axios from "axios";
import { currentUser } from "../auth";
import {
	ActionDataTableArrayType,
	ActionDataTableType,
	ActionType,
} from "@/schemas/schemas-types";
import { actionAPISchema } from "@/schemas/api-schema";
import { EntityType } from "../utils";
import { actionDataArraySchema } from "@/schemas/data-table";
import { ActionDataTableViewArrayType } from "@/app/control-panel/data/schema";
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

export interface AllMemberhipsInfo {
	userId: OrganizationMembership["userId"];
	organizationId: OrganizationMembership["organizationId"];
	createdAt: OrganizationMembership["createdAt"];
	updatedAt: OrganizationMembership["updatedAt"];
	role: OrganizationMembership["role"];
	organization: {
		id: Organization["id"];
		name: Organization["name"];
		plants?: Plant[];
	};
}

interface UserWithCompany extends User {
	company: {
		name: string;
	};
}
export type EventSelect = {
	id: number;
	name: string;
};
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
	const data = (await axios.get<UserWithCompany>(`/api/users`)).data;
	return data;
};

export const getEntityActions = async (entityId: string) => {
	const result = (
		await axios.get<ActionDataTableViewArrayType>(
			`/api/actions?entityType=entity&entityId=${entityId}`
		)
	).data;
	return result;
};

export const getPlantEntitiesActions = async (entityId: string) => {
	const result = (
		await axios.get<ActionDataTableViewArrayType>(
			`/api/actions?entityType=plant&entityId=${entityId}`
		)
	).data;
	return result;
};

export const getOrganizationEntitiesActions = async (
	entityId: string | null
): Promise<ActionDataTableViewArrayType> => {
	if (!entityId) {
		throw new Error("Organization ID is required");
	}

	const result = (
		await axios.get<ActionDataTableViewArrayType>(
			`/api/actions?entityType=organization&entityId=${entityId}`
		)
	).data;
	return result;
};

// POST request
export const createAction = async (data: ActionType) => {
	return (await axios.post(`/api/actions`, data)).data;
};

// PATCH request
export const updateAction = async (
	entityId: string,
	id: string,
	data: ActionType
) => {
	return (await axios.patch(`/api/actions/${entityId}?actionId=${id}`, data))
		.data;
};

// DELETE request
export const deleteAction = async (entityId: string, id: string) => {
	return (await axios.delete(`/api/actions/${entityId}?actionId=${id}`)).data;
};

export const getEventsByGroupId = async (
	eventGroupId: string | undefined
): Promise<EventSelect[]> => {
	if (!eventGroupId) {
		throw new Error("EventGroup ID is required.");
	}
	return (
		await axios.get<EventSelect[]>(`/api/events?eventGroupId=${eventGroupId}`)
	).data;
};

export const getEventById = async (
	eventId: number | null | undefined
): Promise<Event> => {
	if (!eventId) {
		throw new Error("Event ID is required.");
	}
	return (await axios.get<Event>(`/api/events/${eventId}`)).data;
};
