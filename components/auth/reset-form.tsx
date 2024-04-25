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
import { resetPwdSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Input } from "../ui/Input";
import CardWrapper from "./CardWrapper";

const ResetPwdForm = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");

	const form = useForm<z.infer<typeof resetPwdSchema>>({
		resolver: zodResolver(resetPwdSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	async function onSubmit(values: z.infer<typeof resetPwdSchema>) {
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
			headerLabel='Forgot your password?'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
			showSocial={false}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6 toaster'>
					<div className='space-y-4'>
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
										<Input
											placeholder='******'
											{...field}
											type='password'
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
										<Input
											placeholder='******'
											{...field}
											type='password'
											disabled={isSubmitting}
										/>
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

export default ResetPwdForm;
