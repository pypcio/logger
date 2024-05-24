import { z } from "zod";

import { ActionStatus } from "@prisma/client";
const actionStatusValues = Object.values(ActionStatus);
const ActionStatusEnum = z.enum(actionStatusValues as [string, ...string[]]);

// Define the schema
export const controlSchema = z.object({
	id: z.string(),
	action: z.string(),
	status: ActionStatusEnum,
	schedule: z.date(),
	value: z.number().nullable(), // value can be null
	unit: z.string(),
});

export type Control = z.infer<typeof controlSchema>;

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	id: z.string(),
	title: z.string(),
	status: z.string(),
	label: z.string(),
	priority: z.string(),
});
export type Task = z.infer<typeof taskSchema>;
