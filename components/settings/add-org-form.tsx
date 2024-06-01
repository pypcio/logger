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
} from "@/components/ui/form";
import { addOrgSchema } from "@/schemas/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Input } from "../ui/input";
import CardWrapper from "../auth/CardWrapper";
import { useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import { Text } from "@radix-ui/themes";
import { createOrg } from "@/actions/create-org";
import { addOrg } from "@/actions/add-org";

const AddOrgForm = () => {
	const params = useSearchParams();
	const urlError =
		params.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider!"
			: "";

	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const form = useForm<z.infer<typeof addOrgSchema>>({
		resolver: zodResolver(addOrgSchema),
		defaultValues: {
			organization: "",
		},
	});
	async function onSubmit(values: z.infer<typeof addOrgSchema>) {
		setError("");
		setSuccess("");
		setSubmitting(true);
		addOrg(values).then((data) => {
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
			mainLabel='Settings'
			headerLabel='Add organization'
			backButtonLabel='Create Organization'
			backButtonHref='/settings/create-organization'
			showBackButton>
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
									<FormLabel>Organization name:</FormLabel>
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
					</div>
					{<FormError message={onError || urlError} />}
					{<FormSuccess message={onSuccess} />}
					<Button className='w-full' type='submit' disabled={isSubmitting}>
						Submit
					</Button>
				</form>
			</Form>
			<div className=' flex flex-col justify-center items-center mt-4 pt-4 border-t-2'>
				<Text className='text-muted-foreground'>or</Text>
			</div>

			{/* <Toaster position='bottom-center' /> */}
		</CardWrapper>
	);
};

export default AddOrgForm;
