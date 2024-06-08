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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/CardWrapper";
import BackButton from "@/components/auth/BackButton";
import { useRouter, useSearchParams } from "next/navigation";

import { Action, DeviceType, Event } from "@prisma/client";
import React from "react";
import { actionSchema } from "@/schemas/forms-schema";
import { ActionType } from "@/schemas/schemas-types";
import Link from "next/link";
import prisma from "@/prisma/client";
import { useEvent, useEvents } from "@/app/control-panel/new/query";
import { createAction } from "@/lib/services/api";
import { parseJsonSafely } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
type EventGroup = {
	id: string;
	deviceName: string;
	deviceType: DeviceType | null;
	organization: {
		name: string;
	};
};
const ActionForm = ({ eventGroups }: { eventGroups: EventGroup[] }) => {
	const router = useRouter();
	const params = useSearchParams();
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const [eventGroupId, setEventGroupId] = useState<string | undefined>();
	const [eventId, setEventId] = useState<number | undefined | null>();
	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof actionSchema>>({
		resolver: zodResolver(actionSchema),
		// defaultValues,
	});
	// const eventId = form.watch("eventId");
	// const eventGroupId = form.watch("eventGroupId");
	const { data: events, isLoading, isError, error } = useEvents(eventGroupId);
	const {
		data: event,
		isLoading: isLoadingEvent,
		isError: isErrorEvent,
		error: eventError,
	} = useEvent(eventId);
	async function onSubmit(values: z.infer<typeof actionSchema>) {
		setError("");
		setSuccess("");
		setSubmitting(true);
		let message = "";
		let title = "";
		let variant: "default" | "destructive" = "default";
		try {
			if (event) {
				const enhancedValues = {
					...values,
					valueType: event.valueType,
				};

				if (event.valueType === "BOOLEAN") {
					const parsedValues = event.predefinedValues as any[];
					if (parsedValues?.indexOf(enhancedValues.stringValue) === 0)
						enhancedValues.boolValue = false;
					else enhancedValues.boolValue = true;
				}
				const response = await axios.post(`/api/actions`, enhancedValues);
				console.log("response: ", response);
				if (response.status >= 200 && response.status < 300) {
					// setSuccess("Action updated successfully!");
					message = "Action updated successfully!";
					title = "Success";
				} else {
					// setError(`Failed to update action. Error: ${response.statusText}`);
					message = `Failed to update action. Error: ${response.statusText}`;
					title = "Oh no! Could not create action!";
					variant = "destructive";
				}
			}
		} catch (e) {
			// setError("Failed to update action. Please check the form for errors.");
			message = "Failed to update action. Please check the form for errors.";
			title = "Oh no! Could not create action!";
			variant = "destructive";
		} finally {
			setSubmitting(false);
			setEventGroupId("");
			setEventId(null);
			form.reset();
			// router.refresh();
			queryClient.resetQueries({ queryKey: ["event", "events"] });
			toast({
				variant: variant,
				title: title,
				description: message,
			});
		}
	}
	return (
		<div className='flex-1 flex items-center justify-center'>
			<CardWrapper
				mainLabel={`${eventGroups[0].organization.name}`}
				headerLabel='Create Action'
				backButtonLabel='Go back'
				backButtonHref='/control-panel'
				showBackButton>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6 toaster'>
						<div className='space-y-6'>
							<FormField
								control={form.control}
								name='eventGroupId'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Device: </FormLabel>
										<Select
											onValueChange={(evGrpId: string) => {
												setEventGroupId(evGrpId);
												form.setValue("eventGroupId", evGrpId);
												form.resetField("eventId");
												setEventId(null);
											}}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select device' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{eventGroups &&
													eventGroups.map((eventGroup) => (
														<SelectItem
															key={eventGroup.id}
															value={eventGroup.id}>
															<div className='flex h-5 items-center space-x-4 text-sm'>
																<p className='text-sm font-medium leading-none'>
																	{eventGroup.deviceName}
																</p>
																<Separator orientation='vertical' />
																<p className='text-sm font-medium leading-none text-gray-400'>
																	{eventGroup.deviceType
																		?.toLowerCase()
																		.replace(/_/g, " ")}
																</p>
															</div>
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='eventId'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Event: </FormLabel>
										<Select
											onValueChange={(evId: string) => {
												setEventId(parseInt(evId));
												// form.resetField("boolValue");
												// form.resetField("stringValue");
												// form.resetField("intValue");
												// form.resetField("floatValue");
												form.setValue("eventId", parseInt(evId));
											}}
											defaultValue={field?.value?.toString()}
											disabled={!eventGroupId || isSubmitting}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select event' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{events && events.length > 0 ? (
													events.map((event) => (
														<SelectItem
															key={event.id}
															value={event.id.toString()}>
															{event.name}
														</SelectItem>
													))
												) : (
													<SelectItem value='key' disabled>
														No events available
													</SelectItem>
												)}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<div>
								{event && eventId && event.valueType === "STRING" && (
									<FormField
										control={form.control}
										name='stringValue'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Value {event.unit ? ` (${event.unit})` : ""}
												</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value?.toString() ?? ""}
														disabled={!eventGroupId || isSubmitting}>
														<SelectTrigger>
															<SelectValue placeholder='Select value' />
														</SelectTrigger>
														<SelectContent>
															{Array.isArray(event.predefinedValues) &&
																event.predefinedValues.map((value, index) => (
																	<SelectItem
																		key={index}
																		value={value!.toString()}>
																		{value?.toString()}
																	</SelectItem>
																))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{event && eventId && event.valueType === "FLOAT" && (
									<FormField
										control={form.control}
										name='floatValue'
										disabled={!eventGroupId || isSubmitting}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Value {event.unit ? ` (${event.unit})` : ""}
												</FormLabel>
												<FormControl>
													<Input
														type='number'
														min={event.rangeStart!}
														max={event.rangeEnd!}
														step={event.step ?? undefined}
														placeholder={`Enter a value between ${event.rangeStart} and ${event.rangeEnd}`}
														{...field}
														// defaultValue={event.rangeStart ?? undefined}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{event && event.valueType === "INTEGER" && (
									<FormField
										control={form.control}
										name='intValue'
										disabled={!eventGroupId || isSubmitting}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Value {event.unit ? ` (${event.unit})` : ""}
												</FormLabel>
												<FormControl>
													<Input
														type='number'
														min={event.rangeStart!}
														max={event.rangeEnd!}
														step={event.step ?? 1}
														placeholder={`Enter an integer between ${event.rangeStart} and ${event.rangeEnd}`}
														{...field}
														// value={field.value ?? undefined}
														// defaultValue={event.rangeStart ?? undefined}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{event && event.valueType === "BOOLEAN" && (
									<FormField
										control={form.control}
										name='stringValue'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Value {event.unit ? ` (${event.unit})` : ""}
												</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value?.toString()}
														disabled={!eventGroupId || isSubmitting}>
														<SelectTrigger>
															<SelectValue placeholder='Select status' />
														</SelectTrigger>
														<SelectContent>
															{Array.isArray(event.predefinedValues) &&
																event.predefinedValues.map((label, index) => (
																	<SelectItem
																		key={index}
																		value={label!.toString()}>
																		{label?.toString()}
																	</SelectItem>
																))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</div>
							{event && (
								<FormField
									control={form.control}
									name='schedule'
									disabled={!eventGroupId || isSubmitting}
									render={({ field }) => (
										<FormItem className='flex flex-col'>
											<FormLabel>Date</FormLabel>
											<DateTimePicker
												date={new Date()}
												setDate={(date: Date | undefined) => {
													field.onChange(date);
												}}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
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
		</div>
	);
};

export default ActionForm;
