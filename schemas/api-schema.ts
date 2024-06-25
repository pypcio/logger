import {
	Prisma,
	ValueType as PrismaValueType,
	DeviceType as PrismaDeviceType,
	ActionStatus as PrismaActionStatus,
	EventInstruction as PrismaEventInstruction,
} from "@prisma/client";
import { z } from "zod";
export const DeviceType = z.nativeEnum(PrismaDeviceType);

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
});

const deviceSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Device name is required" })
		.max(191, { message: "Name is too long" })
		.trim() // Removes leading and trailing whitespace
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
	deviceType: DeviceType,
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

// const actionStatusValues = Object.values(ActionStatus);
// const ActionStatusEnum = z.enum(actionStatusValues as [string, ...string[]]);
// const actionControlSchema = z.object({
// 	id: z.number(),
// 	name: z.string(),
// 	action: z.string(),
// 	status: ActionStatusEnum,
// 	schedule: z.string().transform((val) => new Date(val)),
// 	value: z.number().nullable(),
// 	unit: z.string(),
// });

// const actionStatusValues = Object.values(ActionStatus);
// const ActionStatusEnum = z.enum(actionStatusValues);
// const valueType = Object.values(ValueType);
// const ValueTypeEnum = z.enum(valueType);

// Extract enum values from Prisma
const ValueType = z.nativeEnum(PrismaValueType);
const ActionStatus = z.nativeEnum(PrismaActionStatus);

const actionAPISchema = z
	.object({
		deviceId: z.string(),
		valueType: ValueType,
		floatValue: z.coerce.number().nullable().optional(),
		intValue: z.coerce.number().nullable().optional(),
		boolValue: z.coerce.boolean().nullable().optional(),
		stringValue: z.string().nullable().optional(),
		eventId: z.coerce.number(),
		schedule: z.coerce.date().optional(),
	})
	.refine(
		(data) => {
			switch (data.valueType) {
				case "FLOAT":
					return data.floatValue !== null;
				case "INTEGER":
					return data.intValue !== null;
				case "BOOLEAN":
					return data.boolValue !== null;
				case "STRING":
					return data.stringValue !== null;
				default:
					return false;
			}
		},
		{
			message: "Invalid value for the given valueType",
			path: ["valueType"],
		}
	);
const EventInstruction = z.nativeEnum(PrismaEventInstruction);
const publishEventSchema = z.object({
	slave_id: z.number(),
	oper: EventInstruction,
	value: z.union([z.string(), z.number(), z.boolean()]),
});
const publishEventsSchema = z.array(publishEventSchema);
export {
	organizationSchema,
	updateOrganizationSchema,
	plantSchema,
	deviceSchema,
	actionAPISchema,
	publishEventSchema,
	publishEventsSchema,
};
