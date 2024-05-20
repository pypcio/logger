import * as z from "zod";
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
