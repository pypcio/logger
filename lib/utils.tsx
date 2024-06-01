import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const formatSexyDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};

	return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Helper function to parse JSON safely and type-guard the result
export function parseJsonSafely(input: any): any[] | null {
	if (typeof input === "string") {
		try {
			const parsed = JSON.parse(input);
			if (Array.isArray(parsed)) {
				return parsed;
			}
			throw new Error("Parsed value is not an array");
		} catch (error: any) {
			throw new Error("Failed to parse predefinedValues: " + error.message);
		}
	}
	return null;
}
//remove group supix from string
export function removeGroupSuffix(str: string): string {
	return str.endsWith("-group") ? str.slice(0, -6) : str;
}

export enum EntityType {
	organization = "organization",
	plant = "plant",
	entity = "entity",
}

import { ActionStatus } from "@prisma/client";
import { Column, ColumnDef } from "@tanstack/react-table";

// Helper function to convert enum value to desired label format
const formatLabel = (value: string) => {
	return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const createActionOptions = () => {
	const labels: { label: string; value: string }[] = [];

	for (const key in ActionStatus) {
		if (ActionStatus.hasOwnProperty(key)) {
			const enumValue = ActionStatus[key as keyof typeof ActionStatus];
			labels.push({
				value: enumValue,
				label: formatLabel(enumValue),
			});
		}
	}

	return labels;
};

export function useDeviceOptions() {
	const labels: { label: string; value: string }[] = [];

	for (const key in ActionStatus) {
		if (ActionStatus.hasOwnProperty(key)) {
			const enumValue = ActionStatus[key as keyof typeof ActionStatus];
			labels.push({
				value: enumValue,
				label: formatLabel(enumValue),
			});
		}
	}
}
