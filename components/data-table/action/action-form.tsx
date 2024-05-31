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

import { Action, Event } from "@prisma/client";
import React from "react";
import { actionSchema } from "@/schemas/forms-schema";
import { ActionType } from "@/schemas/schemas-types";
import Link from "next/link";
import prisma from "@/prisma/client";
import { useEvent, useEvents } from "@/app/control-panel/new/query";
import { parseJsonSafely } from "@/lib/utils";
type ActionFormType = z.infer<typeof actionSchema>;
type EventGroup = {
	id: string;
	deviceName: string;
};
const ActionForm = ({ eventGroups }: { eventGroups: EventGroup[] }) => {
	const router = useRouter();
	const params = useSearchParams();
	const [isSubmitting, setSubmitting] = useState(false);
	const [onError, setError] = useState<string | undefined>("");
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const [predefinedValues, setPredefinedValues] = useState<Array<string>>();
	// const [eventGroupId, setEventGroupId] = useState<string | undefined>("");
	// const [defaultValues, setDefaultValues] = useState<Partial<ActionFormType>>({
	// 	eventGroupId: "",
	// 	boolValue: null,
	// 	floatValue: null,
	// 	intValue: null,
	// 	stringValue: null,
	// 	unit: null,
	// 	schedule: null,
	// });
	const form = useForm<z.infer<typeof actionSchema>>({
		resolver: zodResolver(actionSchema),
		// defaultValues,
	});
	const eventId = form.watch("eventId");
	const eventGroupId = form.watch("eventGroupId");
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
		console.log("values: ", values);
		// createOrg(values).then((data) => {
		// 	setSubmitting(false);
		// 	if (data?.error) {
		// 		form.reset();
		// 		setError(data.error);
		// 	}

		// 	if (data?.success) {
		// 		form.reset();
		// 		setSuccess(data.success);
		// 		// router.push("/dashboard")
		// 		// router.refresh();
		// 	}
		// });
	}
	useEffect(() => {
		if (event) {
			console.log("predefinedValues: ", typeof event.predefinedValues);
			const predValues = event?.predefinedValues
				? parseJsonSafely(event.predefinedValues)
				: null;
			if (predValues) {
				setPredefinedValues(predValues);
			}
		}
	}, [event]);
	console.log("event: ", event);
	return (
		<div className='flex-1 flex items-center justify-center'>
			<CardWrapper
				mainLabel=''
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
												// setEventGroupId(evGrpId);
												form.setValue("eventGroupId", evGrpId);
												form.resetField("eventId");
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
															{eventGroup.deviceName}
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
												// setEventGroupId(evGrpId);
												form.resetField("boolValue");
												form.resetField("stringValue");
												form.resetField("intValue");
												form.resetField("floatValue");
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
								{event && event.valueType === "STRING" && (
									<FormField
										control={form.control}
										name='stringValue'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Value</FormLabel>
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
								{event && event.valueType === "FLOAT" && (
									<FormField
										control={form.control}
										name='floatValue'
										disabled={!eventGroupId || isSubmitting}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Input
														type='number'
														min={event.rangeStart ?? ""}
														max={event.rangeEnd ?? ""}
														step={event.step ?? "any"}
														placeholder={`Enter a value between ${event.rangeStart} and ${event.rangeEnd}`}
														{...field}
														value={field.value ?? ""}
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
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Input
														type='number'
														min={event.rangeStart ?? ""}
														max={event.rangeEnd ?? ""}
														step={event.step ?? "1"}
														placeholder={`Enter an integer between ${event.rangeStart} and ${event.rangeEnd}`}
														{...field}
														value={field.value ?? ""}
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
										name='boolValue'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Value</FormLabel>
												<FormControl>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value?.toString() ?? ""}
														disabled={!eventGroupId || isSubmitting}>
														<SelectTrigger>
															<SelectValue placeholder='Select status' />
														</SelectTrigger>
														<SelectContent>
															{Array.isArray(event.predefinedValues) &&
																event.predefinedValues.map((label, index) => (
																	<SelectItem
																		key={index}
																		value={index.toString()}>
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
						</div>
						{<FormError message={onError || isError ? error?.message : ""} />}
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
