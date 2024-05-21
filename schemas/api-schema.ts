import { ActionStatus } from "@prisma/client";
import { z } from "zod";

const plantSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Plant name is required" })
		.max(191, { message: "Name is too long" })
		.trim() // Removes leading and trailing whitespace
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
	description: z.string().min(1).max(65535).nullish(),
	// organizationId: z
	// 	.string()
	// 	.min(1, "Organization is required")
	// 	.max(255)
	// 	.nullish(),
});

const loggerSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Logger name is required" })
		.max(191, { message: "Name is too long" })
		.trim() // Removes leading and trailing whitespace
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
	description: z.string().min(1).max(65535).nullish(),
	plant_id: z.string().min(1, "Plant is required").max(255),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
});

const inverterSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Inverter name is required" })
		.max(191, { message: "Name is too long" })
		.trim() // Removes leading and trailing whitespace
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
	description: z.string().min(1).max(65535).nullish(),
	plant_id: z.string().min(1, "Plant is required").max(255),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
});

const meterSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Meter name is required" })
		.max(191, { message: "Name is too long" })
		.trim() // Removes leading and trailing whitespace
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
	description: z.string().min(1).max(65535).nullish(),
	plant_id: z.string().min(1, "Plant is required").max(255),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
});

const organizationSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Organization is required" })
		.max(191, { message: "Name is too long" })
		.trim() // Removes leading and trailing whitespace
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
});

const updateOrganizationSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Organization is required" })
		.max(191, { message: "Name is too long" })
		.trim() // Removes leading and trailing whitespace
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
	stripe: z
		.string()
		.min(1, { message: "Stripe ID is required" })
		.max(191, { message: "ID length not valid" }),
});

const actionStatusValues = Object.values(ActionStatus);
const ActionStatusEnum = z.enum(actionStatusValues as [string, ...string[]]);
const actionControlSchema = z.object({
	id: z.number(),
	action: z.string(),
	status: ActionStatusEnum,
	schedule: z.string().transform((val) => new Date(val)),
	value: z.number().nullable(),
	unit: z.string(),
});

export {
	organizationSchema,
	updateOrganizationSchema,
	plantSchema,
	loggerSchema,
	inverterSchema,
	meterSchema,
	actionControlSchema,
};
