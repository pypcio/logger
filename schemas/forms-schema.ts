import { z } from "zod";

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
export {
	loginUserSchema,
	registerUserSchema,
	newPasswordSchema,
	addOrgSchema,
	createOrgSchema,
	resetSchema,
	createPlantSchema,
};
