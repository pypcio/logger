"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginUserSchema } from "@/schemas/schema";
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
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
	const router = useRouter();
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const form = useForm<z.infer<typeof loginUserSchema>>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	async function onSubmit(values: z.infer<typeof loginUserSchema>) {
		try {
			setError("");
			setSuccess("");
			setSubmitting(true);
			await axios.post("/api/auth/login", { ...values });
			setSuccess("Logging in...");
			router.push("/");
		} catch (error) {
			setError(error.response.data.error);
			setSubmitting(false);
		}
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
									<FormLabel>Username</FormLabel>
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

export default LoginForm;
