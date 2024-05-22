"use client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useAllPlantsActionControl } from "./query";

export default function DemoPage() {
	// const data = await getData();
	const { data, isLoading } = useAllPlantsActionControl();

	return (
		<div className='container mx-auto py-10'>
			{isLoading || !data ? (
				<p>Loading...</p>
			) : (
				<DataTable columns={columns} data={data} />
			)}
		</div>
	);
}
