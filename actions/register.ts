"use server";
import bcrypt from "bcryptjs";
import { registerUserSchema } from "@/schemas/forms-schema";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokents";
import prisma from "@/prisma/client";
import { UserRole } from "@prisma/client";

export const register = async (values: any) => {
	const validateRegister = registerUserSchema.safeParse(values);
	if (!validateRegister.success) {
		return { error: "Invalid fields!" };
	}

	const { name, email, password } = validateRegister.data;

	// Check if user already exists
	const existingUser = await prisma.user.findUnique({
		where: { email },
	});
	if (existingUser) {
		return { error: "User already exists." };
	}

	// Encrypt password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Create user first
	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			hashedPassword,
		},
	});

	// // Check if organization exists
	// const existingOrg = await prisma.organization.findUnique({
	// 	where: { name: organization },
	// });

	// if (existingOrg) {
	// 	// Organization exists, add user as USER
	// 	await prisma.organizationMembership.create({
	// 		data: {
	// 			userId: newUser.id,
	// 			organizationId: existingOrg.id,
	// 			role: UserRole.USER,
	// 		},
	// 	});
	// } else {
	// 	// Create new organization and set user as ADMIN and owner
	// 	await prisma.organization.create({
	// 		data: {
	// 			name: organization,
	// 			owner_id: newUser.id, // Directly set user as owner
	// 			members: {
	// 				create: {
	// 					userId: newUser.id,
	// 					role: UserRole.ADMIN,
	// 				},
	// 			},
	// 		},
	// 	});
	// }

	// Generate verification token and send email
	const verificationToken = await generateVerificationToken(newUser.email);
	await sendVerificationEmail(newUser.email, verificationToken.token);

	return verificationToken
		? { success: "Confirmation email sent!" }
		: { error: "Something went wrong" };
};
