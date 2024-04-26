"use server";
import { registerUserSchema } from "@/schemas/schema";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokents";
import { sendVerificationEmail } from "@/lib/mail";
import { getOrganizationByName } from "@/data/organization";
import { UserRole } from "@prisma/client";
export const register = async (values: any) => {
	const validateRegister = registerUserSchema.safeParse(values);
	if (!validateRegister.success) return { error: "Invalid fields!" };

	const { name, email, password, organization } = validateRegister.data;

	//check if Organization exists
	const existingOrg = await getOrganizationByName(organization);
	if (!existingOrg) return { error: "Organization does not exists" };

	//check if user exists
	const existingUser = await getUserByEmail(email);
	if (existingUser) return { error: "User already exists." };

	const hashedPassword = await bcrypt.hash(password, 10);
	const userData = {
		name,
		email,
		hashedPassword,
		organizationMemberships: {
			create: {
				organizationId: existingOrg.id,
				role: UserRole.ADMIN, // Default value is 'USER' if not specified
			},
		},
	};
	const newUserLinkedToOrg = await prisma.user.create({
		data: userData,
		include: {
			organizationMemberships: true,
		},
	});
	// const newUser = await prisma.user.create({
	// 	data: {
	// 		email,
	// 		hashedPassword,
	// 		name,
	// 	},
	// });

	const verificationToken = await generateVerificationToken(
		newUserLinkedToOrg.email
	);
	await sendVerificationEmail(verificationToken.email, verificationToken.token);
	if (verificationToken) {
		return { success: "Confirmation email sent!" };
	}
	return { error: "Something went wrong" };
};
