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
import { updateAccount } from "@/actions/update-account";

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
	const [isSubmitting, setSubmitting] = useState(false);
	const [disableCompany, setDisableCompany] = useState(false);
	const [defaultValues, setDefaultValues] = useState<
		Partial<AccountFormValues>
	>({ name: "" });
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
	}, [user, form]);

	function onSubmit(values: AccountFormValues) {
		setSubmitting(true);
		updateAccount(values).then((data) => {
			setSubmitting(false);
			if (data?.error) {
				form.reset();
				toast({
					variant: "destructive",
					title: "Oh no! Could not update account!",
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
				<Button disabled={isSubmitting || isLoading} type='submit'>
					Update account
				</Button>
			</form>
		</Form>
	);
}
