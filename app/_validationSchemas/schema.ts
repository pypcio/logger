import { z } from "zod";

const plantSchema = z.object({
	name: z.string().min(2, "Name is required").max(191),
	description: z.string().min(1).max(65535).nullish(),
});

const loggerSchema = z.object({
	name: z.string().min(1, "Name is required").max(191),
	description: z.string().min(1).max(65535).nullish(),
	plant_id: z.string().min(1, "plant_id is required").max(255),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
});

const inverterSchema = z.object({
	name: z.string().min(1, "Name is required").max(191),
	description: z.string().min(1).max(65535).nullish(),
	plant_id: z.string().min(1, "plant_id is required").max(255),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
});

const meterSchema = z.object({
	name: z.string().min(1, "Name is required").max(191),
	description: z.string().min(1).max(65535).nullish(),
	plant_id: z.string().min(1, "plant_id is required").max(255),
	model: z.string().min(1).max(191).nullish(),
	producent: z.string().min(1).max(191).nullish(),
});

export { plantSchema, loggerSchema, inverterSchema, meterSchema };
