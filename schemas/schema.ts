import { z } from "zod";

const plantSchema = z.object({
	name: z.string().min(2, "Name is required").max(191),
	description: z.string().min(1).max(65535).nullish(),
});

const loggerSchema = z.object({
	name: z.string().min(1, "Name is required").max(191),
	description: z.string().min(1).max(65535).nullish(),
	plant_id: z.string().min(1, "plant_id is required").max(255),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
});

const inverterSchema = z.object({
	name: z.string().min(1, "Name is required").max(191),
	description: z.string().min(1).max(65535).nullish(),
	plant_id: z.string().min(1, "plant_id is required").max(255),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
});

const meterSchema = z.object({
	name: z.string().min(1, "Name is required").max(191),
	description: z.string().min(1).max(65535).nullish(),
	plant_id: z.string().min(1, "plant_id is required").max(255),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
});

const loginUserSchema = z.object({
	organization: z.string().min(1, { message: "Organization is required" }),
	email: z.string().email(),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});
const registerUserSchema = z
	.object({
		organization: z.string().min(1, { message: "Organization is required" }),
		email: z.string().email({ message: "Email is required" }),
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

const resetPwdSchema = z
	.object({
		email: z.string().email({ message: "Email is required" }),

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

export {
	plantSchema,
	loggerSchema,
	inverterSchema,
	meterSchema,
	loginUserSchema,
	registerUserSchema,
	resetPwdSchema,
};
