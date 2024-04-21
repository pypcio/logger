"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { loginUserSchema } from "@/schemas/schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/Form";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

const LoginForm = () => {
	const form = useForm<z.infer<typeof loginUserSchema>>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(() => {})} className='space-y-6'>
				<div className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} placeholder='john.doe@gmail.com' type='email' />
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
									<Input {...field} placeholder='password...' type='password' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button color='indigo' className='w-full' type='submit'>
					Login
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
