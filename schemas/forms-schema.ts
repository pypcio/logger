import { z } from "zod";
import {
	ValueType as PrismaValueType,
	ActionStatus as PrismaActionStatus,
} from "@prisma/client";
import { DeviceType } from "./api-schema";
const loginUserSchema = z.object({
	// organization: z.string().min(1, { message: "Organization is required" }),
	email: z.string().email(),
	password: z
		.string()
		.min(1, {
			message: "Password is required",
		})
		.max(20, { message: "password is too long" }),
	code: z.optional(z.string()),
});
const registerUserSchema = z
	.object({
		// organization: z.string().min(1, { message: "Organization is required" }),
		email: z
			.string()
			.email({ message: "Email is required" })
			.max(80, { message: "Email is too long" }),
		password: z
			.string()
			.regex(/^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/, {
				message: "At least one special, number and 8 characters",
			})
			.max(20, { message: "Password is too long" }),
		name: z.string().min(2, { message: "Name is required" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // path of error
	});
//reset password form
const newPasswordSchema = z
	.object({
		password: z
			.string()
			.regex(/^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/, {
				message: "At least one special, number and 8 characters",
			})
			.max(20, { message: "Password is too long" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // path of error
	});

//for sending email "reset password" email
const resetSchema = z.object({
	email: z.string().email({ message: "Email is required" }),
});

const addOrgSchema = z.object({
	organization: z
		.string()
		.min(1, { message: "Organization is required" })
		.max(80, { message: "Name is too long" })
		.trim() // Removes leading and trailing whitespace
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
});

const createOrgSchema = z.object({
	organization: z
		.string()
		.min(1, { message: "Organization is required" })
		.max(80, { message: "Name is too long" })
		.trim() // Removes leading and trailing whitespace
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
});

const createPlantSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Plant name is required" })
		.max(191, { message: "Name is too long" })
		.trim()
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
	description: z.optional(z.string().min(1).max(65535)),
});

const createDeviceSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Device name is required" })
		.max(191, { message: "Name is too long" })
		.trim()
		.refine((name) => !name.includes("  "), {
			message: "Consecutive spaces are not allowed",
		}),
	model: z
		.string()
		.min(1, {
			message: "Model must be at least 2 characters.",
		})
		.max(191, {
			message: "Model too long.",
		})
		.optional(),
	producent: z
		.string()
		.min(1, {
			message: "Producent must be at least 1 characters.",
		})
		.max(191, {
			message: "Producent too long.",
		})
		.optional(),
	deviceType: DeviceType,
});

const accountFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(30, {
			message: "Name must not be longer than 30 characters.",
		}),
});

const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(30, {
			message: "Name must not be longer than 30 characters.",
		}),
	bio: z.string().max(160).min(4),
	company: z
		.string()
		.min(2, {
			message: "Company name must be at least 2 characters.",
		})
		.max(60, {
			message: "Company name  must not be longer than 30 characters.",
		}),
});
const ValueType = z.nativeEnum(PrismaValueType);
const ActionStatus = z.nativeEnum(PrismaActionStatus);

const actionSchema = z.object({
	deviceId: z.string(),
	floatValue: z.coerce.number().optional(),
	intValue: z.coerce.number().optional(),
	boolValue: z.coerce.boolean().optional(),
	stringValue: z.string().optional(),
	eventId: z.coerce.number().nullable(),
	schedule: z.coerce.date().optional(),
});
const actionSchemaValidation = z.object({
	deviceId: z.string(),
	valueType: ValueType,
	floatValue: z.string().nullable(),
	intValue: z.string().nullable(),
	boolValue: z.boolean().nullable(),
	stringValue: z.string().nullable(),
	unit: z.string().nullable(),
	eventId: z.number().nullable(),
	status: ActionStatus,
	schedule: z.date().nullable(),
});
export {
	loginUserSchema,
	registerUserSchema,
	newPasswordSchema,
	addOrgSchema,
	createOrgSchema,
	resetSchema,
	createPlantSchema,
	profileFormSchema,
	accountFormSchema,
	actionSchema,
	actionSchemaValidation,
	createDeviceSchema,
};
