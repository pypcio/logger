"use client";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { loginUserSchema } from "@/schemas/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";
import BackButton from "./BackButton";
import { useSearchParams } from "next/navigation";
import usePasswordToggle, {
	UsePasswordToggleReturnType,
} from "@/hooks/use-pwd-toggle";

const LoginForm = () => {
	const [PasswordInputType, ToggleIcon] = usePasswordToggle();
	const params = useSearchParams();
	const urlError =
		params.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider!"
			: "";
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const form = useForm<z.infer<typeof loginUserSchema>>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			// organization: "",
			email: "",
			password: "",
			code: "",
		},
	});
	async function onSubmit(values: z.infer<typeof loginUserSchema>) {
		setError("");
		setSuccess("");
		setSubmitting(true);
		login(values)
			.then((data) => {
				setSubmitting(false);
				if (data?.error) {
					form.reset();
					setError(data.error);
				}

				if (data?.success) {
					form.reset();
					setSuccess(data.success);
				}
				if (data?.twoFactor) {
					setShowTwoFactor(true);
				}
			})
			.catch(() => setError("Something went wrong Aron"));
		// .finally(() => {
		// 	setShowTwoFactor(false);
		// 	setSuccess("");
		// 	setError("");
		// });
	}
	return (
		<CardWrapper
			mainLabel='Auth'
			headerLabel='Welcome back'
			backButtonLabel="Don't have an account?"
			backButtonHref='/auth/register'
			showBackButton
			showSocial>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6 toaster'>
					<div className='space-y-4'>
						{showTwoFactor && (
							<FormField
								control={form.control}
								name='code'
								render={({ field }) => (
									<FormItem>
										<FormLabel>One-Time Password</FormLabel>
										<FormControl>
											<InputOTP minLength={6} maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormDescription>
											Please enter the one-time password sent to your email.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username:</FormLabel>
											<FormControl>
												<Input
													placeholder='email'
													{...field}
													disabled={isSubmitting}
													type='email'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password:</FormLabel>
											<FormControl>
												<div className='relative'>
													<Input
														placeholder='******'
														{...field}
														type={PasswordInputType}
														disabled={isSubmitting}
													/>
													<span className='absolute inset-y-0 right-0 flex items-center pr-3'>
														{ToggleIcon}
													</span>
												</div>
											</FormControl>
											<BackButton
												label='Forgot password?'
												href='/auth/reset-password'
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					{<FormError message={onError || urlError} />}
					{<FormSuccess message={onSuccess} />}
					<Button className='w-full' type='submit' disabled={isSubmitting}>
						{showTwoFactor ? "Confirm" : "Login"}
					</Button>
				</form>
			</Form>
			{/* <Toaster position='bottom-center' /> */}
		</CardWrapper>
	);
};

export default LoginForm;
