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
import { createOrgSchema } from "@/schemas/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Input } from "../ui/input";
import CardWrapper from "../auth/CardWrapper";
import BackButton from "../auth/BackButton";
import { useRouter, useSearchParams } from "next/navigation";
import { createOrg } from "@/actions/create-org";

const CreateOrgForm = () => {
	const router = useRouter();
	const params = useSearchParams();
	const urlError =
		params.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider!"
			: "";

	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const form = useForm<z.infer<typeof createOrgSchema>>({
		resolver: zodResolver(createOrgSchema),
		defaultValues: {
			organization: "",
		},
	});
	async function onSubmit(values: z.infer<typeof createOrgSchema>) {
		setError("");
		setSuccess("");
		setSubmitting(true);
		createOrg(values).then((data) => {
			setSubmitting(false);
			if (data?.error) {
				form.reset();
				setError(data.error);
			}

			if (data?.success) {
				form.reset();
				setSuccess(data.success);
				// router.push("/dashboard")
				// router.refresh();
			}
		});
	}
	return (
		<CardWrapper
			mainLabel='Settings'
			headerLabel='Create Organization'
			backButtonLabel='Already belong to one?'
			backButtonHref='/settings/add-organization'
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
									<FormLabel>Name:</FormLabel>
									<FormControl>
										<Input
											placeholder='organization...'
											{...field}
											disabled={isSubmitting}
											type='text'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
							control={form.control}
							name='organization'
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
						/> */}
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

export default CreateOrgForm;
