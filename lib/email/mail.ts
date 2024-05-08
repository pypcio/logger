import { Resend } from "resend";
import WelcomeTemplate from "./verify-email-template";
import ResetTemplate from "./reset-template";
import TwoFactorTemplate from "./two-factor-template";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (
	name: string,
	email: string,
	token: string
) => {
	await resend.emails.send({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: email,
		subject: "2FA Code",
		react: TwoFactorTemplate({ name, token }),
	});
};

export const sendResetPasswordEmail = async (
	name: string,
	email: string,
	token: string
) => {
	await resend.emails.send({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: email,
		subject: "Confirm your email",
		react: ResetTemplate({ name, token }),
	});
};

export const sendVerificationEmail = async (
	name: string,
	email: string,
	token: string
) => {
	await resend.emails.send({
		from: `${process.env.SYSTEM_EMAIL}`,
		to: email,
		subject: "Confirm your email",
		react: WelcomeTemplate({ name, token }),
	});
};
