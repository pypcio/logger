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
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createDeviceSchema } from "@/schemas/forms-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CardWrapper from "../auth/CardWrapper";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Input } from "../ui/input";
import { DeviceType, Plant } from "@prisma/client";
import { Label } from "@radix-ui/react-dropdown-menu";

interface Props {
	plants: Plant[];
}

const deviceTypeArray = Object.values(DeviceType);
const CreateDeviceOrgForm = ({ plants }: Props) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const [plantId, setPlantId] = useState<string | undefined>("");
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
	const handlePlantId = (value: string) => {
		setPlantId(value);
	};

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
						<div>
							<Label>Plant</Label>
							<Select onValueChange={handlePlantId}>
								<SelectTrigger>
									<SelectValue placeholder='Select plant' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{plants.map((plant) => (
											<SelectItem key={plant.id} value={plant.id}>
												{plant.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
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

export default CreateDeviceOrgForm;
