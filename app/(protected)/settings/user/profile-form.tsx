"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { profileFormSchema } from "@/schemas/forms-schema";
import { useUserByAuth } from "@/lib/services/queries";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { updateProfile } from "@/actions/update-profile";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
	const { data: user, isLoading, error } = useUserByAuth();
	const [isSubmitting, setSubmitting] = useState(false);
	const [disableCompany, setDisableCompany] = useState(false);
	const [defaultValues, setDefaultValues] = useState<
		Partial<ProfileFormValues>
	>({
		username: "",
		bio: "",
		company: "",
	});

	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: "onChange",
	});

	useEffect(() => {
		if (user) {
			const values: Partial<ProfileFormValues> = {
				username: user?.username ?? "",
				bio: user?.bio ?? "",
				company: user?.company?.name ?? "",
			};
			setDisableCompany(!!values.company);
			setDefaultValues(values);
			form.reset(values);
		}
	}, [user, form]);

	function onSubmit(values: ProfileFormValues) {
		setSubmitting(true);
		updateProfile(values).then((data) => {
			setSubmitting(false);
			if (data?.error) {
				form.reset();
				toast({
					variant: "destructive",
					title: "Oh no! Could not update profile!",
					description: data?.error,
				});
			}

			if (data?.success) {
				form.reset();
				toast({
					variant: "default",
					title: "Success!",
					description: data?.success,
				});
			}
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								{isLoading ? (
									<Skeleton className='w-full h-6' />
								) : (
									<Input placeholder='username' {...field} />
								)}
							</FormControl>
							<FormDescription>
								This is your public display name. It can be your real name or a
								pseudonym. You can only change this once every 30 days.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='company'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company</FormLabel>
							<FormControl>
								{isLoading ? (
									<Skeleton className='w-full h-6' />
								) : (
									<Input
										disabled={disableCompany}
										placeholder='Smart Company'
										{...field}
									/>
								)}
							</FormControl>
							<FormDescription>
								Write a name of a company you belong to. Your request will be
								verified by administration or your supervisor. It might take a
								while.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								{isLoading ? (
									<Skeleton className='w-full h-12' />
								) : (
									<Textarea
										placeholder='Tell us a little bit about yourself'
										className='resize-none'
										{...field}
									/>
								)}
							</FormControl>
							<FormDescription>
								You can <span>@mention</span> other users and organizations to
								link to them.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isSubmitting || isLoading} type='submit'>
					Update profile
				</Button>
			</form>
		</Form>
	);
}
