import { actionDataTableSchema } from "@/schemas/data-table";
import { z } from "zod";

export const actionDataTableViewSchema = actionDataTableSchema.extend({
	schedule: actionDataTableSchema.shape.schedule
		.refine(
			(val) => {
				// Check if it's a valid date string or a Date object
				if (typeof val === "string") {
					return !isNaN(Date.parse(val));
				} else if (val instanceof Date) {
					return true;
				}
				return false;
			},
			{
				message: "Invalid date string or Date object",
			}
		)
		.transform((val) => {
			// Transform string to Date, leave Date object as is
			if (typeof val === "string") {
				return new Date(val);
			}
			return val;
		}),
});

export const actionDataTableViewArraySchema = z.array(
	actionDataTableViewSchema
);
export type ActionDataTableViewType = z.infer<typeof actionDataTableViewSchema>;
export type ActionDataTableViewArrayType = z.infer<
	typeof actionDataTableViewArraySchema
>;
