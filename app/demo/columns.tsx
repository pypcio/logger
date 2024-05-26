"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
	ActionDataTableType,
	actionStatusColors,
} from "@/schemas/schemas-types";
import { Badge } from "@radix-ui/themes";
import { DataTableColumnHeader } from "../control-panel/components/data-table-column-header";
import { formatSexyDate } from "@/lib/utils";
import { ActionStatus } from "@prisma/client";
import BadgeActionStatus from "@/components/data-table/badge";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ActionDataTableType>[] = [
	{
		accessorKey: "plant",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Plant' />
		),
	},
	{
		accessorKey: "device",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Device' />
		),
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Name' />
		),
	},
	{
		accessorKey: "action",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Action' />
		),
	},
	{
		accessorKey: "value",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Value' />
		),
		cell: ({ row }) => {
			const value = row.getValue("value") as string | number | null;
			const unit = row.original.unit;
			return (
				<p>
					{value} {unit}
				</p>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Status' />
		),
		cell: ({ row }) => {
			const status = row.getValue("status") as ActionStatus;
			return <BadgeActionStatus label={status} />;
		},
	},
	{
		accessorKey: "user",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='CreatedBy' />
		),
		cell: ({ row }) => {
			const createdBy = row.getValue("user") as string;
			return <p>{createdBy}</p>;
		},
	},
	{
		accessorKey: "schedule",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Schedule' />
		),
		cell: ({ row }) => {
			const schedule = new Date(row.getValue("schedule"));
			return <p>{formatSexyDate(schedule)}</p>;
		},
	},
];
