"use client";
import { newPassword } from "@/actions/new-password";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import usePasswordToggle from "@/hooks/use-pwd-toggle";
import { newPasswordSchema } from "@/schemas/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Input } from "../ui/input";
import CardWrapper from "./CardWrapper";

const NewPwdForm = () => {
	const [PasswordInputType, ToggleIcon] = usePasswordToggle();
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const form = useForm<z.infer<typeof newPasswordSchema>>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});
	async function onSubmit(values: z.infer<typeof newPasswordSchema>) {
		setError("");
		setSuccess("");
		setSubmitting(true);
		newPassword(values, token)
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
			})
			.catch(() => setError("Something went wrong"));
	}
	return (
		<CardWrapper
			mainLabel='Reset Password'
			headerLabel='Forgot your password?'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
			showBackButton>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6 toaster'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password:</FormLabel>
									<FormControl>
										<Input
											placeholder='******'
											{...field}
											type={PasswordInputType}
											disabled={isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm password:</FormLabel>
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
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{onError && <FormError message={onError} />}
					{onSuccess && <FormSuccess message={onSuccess} />}
					<Button className='w-full' type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</form>
			</Form>
			{/* <Toaster position='bottom-center' /> */}
		</CardWrapper>
	);
};

export default NewPwdForm;
