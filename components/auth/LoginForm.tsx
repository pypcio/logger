"use client";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/Button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/Form";
import { loginUserSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Input } from "../ui/Input";
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

	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const form = useForm<z.infer<typeof loginUserSchema>>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			organization: "",
			email: "",
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof loginUserSchema>) {
		setError("");
		setSuccess("");
		setSubmitting(true);
		login(values).then((data) => {
			setSubmitting(false);
			if (data?.error) {
				form.reset();
				setError(data.error);
			}

			if (data?.success) {
				form.reset();
				setSuccess(data.success);
			}
		});
	}
	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonLabel="Don't have an account?"
			backButtonHref='/auth/register'
			showSocial>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6 toaster'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='organization'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization</FormLabel>
									<FormControl>
										<Input
											placeholder='organization'
											{...field}
											disabled={isSubmitting}
											type='text'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
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
									<FormLabel>Password</FormLabel>
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
					</div>
					{<FormError message={onError || urlError} />}
					{<FormSuccess message={onSuccess} />}
					<Button className='w-full' type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</form>
			</Form>
			{/* <Toaster position='bottom-center' /> */}
		</CardWrapper>
	);
};

export default LoginForm;
