"use client";

// import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon, FilePlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>;
}

export function DataTableViewOptions<TData>({
	table,
}: DataTableViewOptionsProps<TData>) {
	return (
		<div className='flex gap-2'>
			<Button
				size='sm'
				className='h-8 border-dashed bg-primary'
				// onClick={() => router.push("/control-panel/new")}
			>
				<FilePlusIcon className='mr-2 h-4 w-4' />
				<a className='m-0 p-0' href='/control-panel/new'>
					New Action
				</a>
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='outline'
						size='sm'
						className='ml-auto hidden h-8 lg:flex'>
						<MixerHorizontalIcon className='mr-2 h-4 w-4' />
						View
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-[150px]'>
					<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{table
						.getAllColumns()
						.filter(
							(column) =>
								typeof column.accessorFn !== "undefined" && column.getCanHide()
						)
						.map((column) => {
							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									className='capitalize'
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}>
									{column.id}
								</DropdownMenuCheckboxItem>
							);
						})}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
