"use server";

import { resetSchema } from "@/schemas/forms-schema";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { generatePwdResetToken } from "@/lib/tokens";
import { sendResetPasswordEmail } from "@/lib/email/mail";

export const resetPwd = async (values: z.infer<typeof resetSchema>) => {
	const validatePwd = resetSchema.safeParse(values);
	if (!validatePwd.success) return { error: "Invalid email!" };

	const { email } = validatePwd.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) return { error: "User does not exists" };

	const passwordResetToken = await generatePwdResetToken(email);
	try {
		await sendResetPasswordEmail(
			existingUser.name,
			passwordResetToken.email,
			passwordResetToken.token
		);
		return passwordResetToken
			? { success: "Reset email sent!" }
			: { error: "Something went wrong" };
	} catch (error) {
		return { error: "Something went wrong" };
	}
};
