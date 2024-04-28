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

const addOrgSchema = z.object({
	name: z
		.string()
		.min(1, { message: "Organization is required" })
		.max(80, { message: "Name is too long" }),
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

export {
	loginUserSchema,
	registerUserSchema,
	resetPwdSchema,
	addOrgSchema,
	createOrgSchema,
};
