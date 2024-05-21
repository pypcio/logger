import { z } from "zod";
import {
	organizationSchema,
	updateOrganizationSchema,
	plantSchema,
	loggerSchema,
	inverterSchema,
	meterSchema,
	actionControlSchema,
} from "./api-schema";

// Generate TypeScript types from the Zod schemas
export type OrganizationType = z.infer<typeof organizationSchema>;
export type UpdateOrganizationType = z.infer<typeof updateOrganizationSchema>;
export type PlantType = z.infer<typeof plantSchema>;
export type LoggerType = z.infer<typeof loggerSchema>;
export type InverterType = z.infer<typeof inverterSchema>;
export type MeterType = z.infer<typeof meterSchema>;
export type ActionControlType = z.infer<typeof actionControlSchema>;
