"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionControlType, actionStatusColors } from "@/schemas/schemas-types";
import { Badge } from "@radix-ui/themes";
import { DataTableColumnHeader } from "../control-panel/components/data-table-column-header";
import { formatSexyDate } from "@/lib/utils";
import { ActionStatus } from "@prisma/client";
import BadgeActionStatus from "@/components/data-table/badge";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ActionControlType>[] = [
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
	},
	{
		accessorKey: "unit",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Unit' />
		),
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
		accessorKey: "schedule",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Schedule' />
		),
		cell: ({ row }) => {
			return <p>{formatSexyDate(row.getValue("schedule"))}</p>;
		},
	},
];
