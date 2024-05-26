import { Prisma, ValueType, ActionStatus } from "@prisma/client";
import { z } from "zod";

// Define the schema for a single action data entry
const actionDataTableSchema = z.object({
	id: z.number(),
	plant: z.string().nullable(),
	device: z.string().nullable(),
	action: z.string(),
	status: z.nativeEnum(ActionStatus), // Assuming ActionStatus is already defined
	value: z.union([z.string(), z.number(), z.null()]), // value can be string, number, or null
	user: z.string().email(),
	schedule: z.date(),
	unit: z.string().nullable(), // unit can be null
});

const actionDataArraySchema = z.array(actionDataTableSchema);

export { actionDataTableSchema, actionDataArraySchema };
