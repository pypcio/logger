import { z } from "zod";
import {
	organizationSchema,
	updateOrganizationSchema,
	plantSchema,
	actionAPISchema,
	publishEventsSchema,
	publishEventSchema,
} from "./api-schema";
import { ActionStatus } from "@prisma/client";
import { actionDataArraySchema, actionDataTableSchema } from "./data-table";

export type BadgeColor =
	| "gray"
	| "gold"
	| "bronze"
	| "brown"
	| "yellow"
	| "amber"
	| "orange"
	| "tomato"
	| "red"
	| "ruby"
	| "crimson"
	| "pink"
	| "plum"
	| "purple"
	| "violet"
	| "iris"
	| "indigo"
	| "blue"
	| "cyan"
	| "teal"
	| "jade"
	| "green"
	| "grass"
	| "lime"
	| "mint"
	| "sky";
// Generate TypeScript types from the Zod schemas
export type OrganizationType = z.infer<typeof organizationSchema>;
export type UpdateOrganizationType = z.infer<typeof updateOrganizationSchema>;
export type PlantType = z.infer<typeof plantSchema>;
export type ActionType = z.infer<typeof actionAPISchema>;
export type ActionDataTableType = z.infer<typeof actionDataTableSchema>;
export type ActionDataTableArrayType = z.infer<typeof actionDataArraySchema>;
export type PublishEventsType = z.infer<typeof publishEventsSchema>;
export type PublishEventType = z.infer<typeof publishEventSchema>;
export const actionStatusColors: Record<string, BadgeColor> = {
	[ActionStatus.PENDING]: "gray",
	[ActionStatus.SCHEDULED]: "cyan",
	[ActionStatus.EXECUTED]: "green",
	[ActionStatus.CANCELED]: "crimson",
	[ActionStatus.EXPIRED]: "amber",
	[ActionStatus.ERROR]: "purple",
};
export const actionStatusLabels = {};
