"use client";
import { createDevice } from "@/actions/create-device";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createDeviceSchema } from "@/schemas/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CardWrapper from "@/components/auth/CardWrapper";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Input } from "@/components/ui/input";
import { DeviceType } from "@prisma/client";
import { useRouter } from "next/navigation";

const deviceTypeArray = Object.values(DeviceType);

interface Props {
	plantId: string;
}

const CreateDeviceForm = ({ plantId }: Props) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const form = useForm<z.infer<typeof createDeviceSchema>>({
		resolver: zodResolver(createDeviceSchema),
		defaultValues: {
			name: "",
			producent: "",
			model: "",
		},
	});
	async function onSubmit(values: z.infer<typeof createDeviceSchema>) {
		setError("");
		setSuccess("");
		setSubmitting(true);
		if (plantId) {
			createDevice(plantId, values).then((data) => {
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
		} else {
			setError("Plant is mandatory.");
		}
	}
	return (
		<CardWrapper
			mainLabel='Device'
			headerLabel='Create new Device'
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
											placeholder='logger-01...'
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
							name='producent'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Producent (optional)</FormLabel>
									<FormControl>
										<Input
											placeholder='Producent...'
											className='resize-none'
											{...field}
											disabled={isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='model'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Model (optional)</FormLabel>
									<FormControl>
										<Input
											placeholder='ABC-123:1...'
											className='resize-none'
											{...field}
											disabled={isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='deviceType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Device: </FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select device' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{deviceTypeArray.map((device, index) => (
												<SelectItem key={device + index} value={device}>
													<p className='text-sm font-medium leading-none'>
														{device.toLowerCase().replace(/_/g, " ")}
													</p>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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

export default CreateDeviceForm;
