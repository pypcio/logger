import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { profileFormSchema } from "@/schemas/forms-schema";
import * as z from "zod";
export const profile = async (values: z.infer<typeof profileFormSchema>) => {
	const session = await auth();
	if (!session || !session.user.id) return { error: "User not logged in." };

	const validateProfile = profileFormSchema.safeParse(values);
	if (!validateProfile.success) return { error: "Invalid fields!" };

	const { username, bio, company } = validateProfile.data;

	//TO DO: send email to owner/admin of a company
	const existingCompany = await prisma.company.findUnique({
		where: {
			name: company,
		},
		include: {
			owner: {
				select: {
					email: true,
				},
			},
		},
	});
	if (!existingCompany) return { error: "Company does not exists" };

	try {
		const updateUser = await prisma.user.update({
			where: { id: session.user.id },
			data: {
				username,
				bio,
			},
		});
	} catch (error) {}
};
