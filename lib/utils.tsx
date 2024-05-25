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
