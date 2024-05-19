"use client";
import { createPlant } from "@/actions/create-plant";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createPlantSchema } from "@/schemas/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CardWrapper from "../auth/CardWrapper";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Input } from "../ui/input";

const CreatePlantForm = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const form = useForm<z.infer<typeof createPlantSchema>>({
		resolver: zodResolver(createPlantSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});
	async function onSubmit(values: z.infer<typeof createPlantSchema>) {
		setError("");
		setSuccess("");
		setSubmitting(true);
		createPlant(values).then((data) => {
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
			headerLabel='Create Plant'
			backButtonLabel='Back to settings'
			backButtonHref='/settings/select-organization'
			showBackButton>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6 toaster'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder='plant...'
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
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description (optional)</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Describe you plant...'
											className='resize-none'
											{...field}
											disabled={isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{<FormError message={onError} />}
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

export default CreatePlantForm;
