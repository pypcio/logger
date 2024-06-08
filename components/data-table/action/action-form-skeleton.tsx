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
import { loginUserSchema } from "@/schemas/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/CardWrapper";
import { Skeleton } from "@/components/ui/skeleton";

const ActionFormSkeleton = () => {
	const form = useForm<z.infer<typeof loginUserSchema>>({
		resolver: zodResolver(loginUserSchema),
		defaultValues: {
			// organization: "",
			email: "",
			password: "",
			code: "",
		},
	});
	return (
		<div className='flex-1 flex items-center justify-center'>
			<CardWrapper mainLabel='' headerLabel='' className='h-[450px]'>
				<Skeleton className='h-8 w-[60%] m-auto rounded-md' />
				<Form {...form}>
					<form className='space-y-8 toaster mt-10'>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											<Skeleton className='h-6 w-[70px] rounded-md' />
										</FormLabel>
										{/* <FormControl> */}
										<Skeleton className='h-6 w-full rounded-md' />
										{/* <Input
											placeholder='email'
											{...field}
											type='email'
										/> */}
										{/* </FormControl> */}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											<Skeleton className='h-6 w-[70px] rounded-md' />
										</FormLabel>
										{/* <FormControl> */}
										<Skeleton className='h-6 w-full rounded-md' />
										{/* <Input
											placeholder='email'
											{...field}
											type='email'
										/> */}
										{/* </FormControl> */}
									</FormItem>
								)}
							/>
						</div>
					</form>
					<Skeleton className='mt-14 h-8 w-full bg-primary' />
				</Form>
				{/* <Toaster position='bottom-center' /> */}
			</CardWrapper>
		</div>
	);
};

export default ActionFormSkeleton;
