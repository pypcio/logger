import { z } from "zod";
import {
	organizationSchema,
	updateOrganizationSchema,
	plantSchema,
	loggerSchema,
	inverterSchema,
	meterSchema,
	actionSchema,
} from "./api-schema";
import { ActionStatus } from "@prisma/client";
import { actionDataTableSchema } from "./data-table";

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
export type LoggerType = z.infer<typeof loggerSchema>;
export type InverterType = z.infer<typeof inverterSchema>;
export type MeterType = z.infer<typeof meterSchema>;
export type ActionType = z.infer<typeof actionSchema>;
export type ActionDataTableType = z.infer<typeof actionDataTableSchema>;
export const actionStatusColors: Record<ActionStatus, BadgeColor> = {
	[ActionStatus.SCHEDULED]: "cyan",
	[ActionStatus.EXECUTED]: "green",
	[ActionStatus.CANCELED]: "crimson",
	[ActionStatus.EXPIRED]: "amber",
	[ActionStatus.ERROR]: "purple",
};
