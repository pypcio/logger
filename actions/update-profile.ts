"use server";
import { auth } from "@/auth";
import { sendRequestAddToCompany } from "@/lib/email/mail";
import prisma from "@/prisma/client";
import { profileFormSchema } from "@/schemas/forms-schema";
import * as z from "zod";

export const updateProfile = async (
	values: z.infer<typeof profileFormSchema>
) => {
	const session = await auth();
	if (!session || !session.user.id || !session.user.name)
		return { error: "User not logged in." };

	const validateProfile = profileFormSchema.safeParse(values);
	if (!validateProfile.success) return { error: "Invalid fields!" };

	const { username, bio, company } = validateProfile.data;
	let isSendingEmail = false; //flag for sending email
	const existingCompany = await prisma.company.findFirst({
		where: {
			name: company,
			users: { none: { id: session.user.id } },
			owner: { NOT: { id: session.user.id } },
		},
		include: {
			owner: {
				select: {
					email: true,
				},
			},
		},
	});
	//update user profile info
	try {
		if (existingCompany) {
			const createRequest = await prisma.request.create({
				data: { userId: session.user.id, companyId: existingCompany.id },
			});
			if (createRequest) {
				await sendRequestAddToCompany(
					session.user.name,
					existingCompany.owner.email
				);
				isSendingEmail = true;
			}
		}
		const updateUser = await prisma.user.update({
			where: { id: session.user.id },
			data: { bio, username },
		});
		const message =
			"Profile updated." + isSendingEmail
				? ` Sent request to ${existingCompany?.name}`
				: "";
		//TO DO: send email to owner/admin of a company
		return { success: message };
	} catch (error) {
		return { error: "Could not update profile." };
	}
};
