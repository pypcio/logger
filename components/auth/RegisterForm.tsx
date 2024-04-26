"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUserSchema } from "@/schemas/schema";
import { Button } from "@/components/ui/Button";
import FormError from "../form-error";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/Form";
import { Input } from "../ui/Input";
import CardWrapper from "./CardWrapper";
import FormSuccess from "../form-success";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
import usePasswordToggle, {
	UsePasswordToggleReturnType,
} from "@/hooks/use-pwd-toggle";

const RegisterForm = () => {
	const [PasswordInputType, ToggleIcon] = usePasswordToggle();
	const router = useRouter();
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const form = useForm<z.infer<typeof registerUserSchema>>({
		resolver: zodResolver(registerUserSchema),
		defaultValues: {
			organization: "",
			email: "",
			password: "",
			name: "",
			confirmPassword: "",
		},
	});
	async function onSubmit(values: z.infer<typeof registerUserSchema>) {
		setError("");
		setSuccess("");
		setSubmitting(true);
		register(values).then((data) => {
			setSubmitting(false);
			setError(data?.error);
			setSuccess(data?.success);
		});
	}

	return (
		<CardWrapper
			headerLabel='Create an acount'
			backButtonLabel='Already have an account?'
			backButtonHref='/auth/login'
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
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder='your name...'
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
									<FormLabel>Email</FormLabel>
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
									<FormLabel>Confirm password</FormLabel>
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

export default RegisterForm;
