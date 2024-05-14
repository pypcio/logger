"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { accountFormSchema } from "@/schemas/forms-schema";
import { useUserByAuth } from "@/lib/services/queries";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const languages = [
	{ label: "English", value: "en" },
	{ label: "French", value: "fr" },
	{ label: "German", value: "de" },
	{ label: "Spanish", value: "es" },
	{ label: "Portuguese", value: "pt" },
	{ label: "Russian", value: "ru" },
	{ label: "Japanese", value: "ja" },
	{ label: "Korean", value: "ko" },
	{ label: "Chinese", value: "zh" },
] as const;

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
	const { data: user, isLoading, error } = useUserByAuth();
	const [defaultValues, setDefaultValues] =
		useState<Partial<AccountFormValues>>();
	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues,
	});

	useEffect(() => {
		if (user) {
			const values: Partial<AccountFormValues> = {
				name: user?.name ?? "",
			};
			setDefaultValues(values);
			form.reset(values);
		}
	}, [user]);

	function onSubmit(data: AccountFormValues) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								{isLoading ? (
									<Skeleton className='w-full h-6' />
								) : (
									<Input placeholder='Your name' {...field} />
								)}
							</FormControl>
							<FormDescription>
								This is the name that will be displayed on your profile and in
								emails.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Update account</Button>
			</form>
		</Form>
	);
}
