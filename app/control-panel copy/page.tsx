import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { UserNav } from "./components/user-nav";
import { taskSchema } from "./data/schema";

export const metadata: Metadata = {
	title: "Tasks",
	description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
	const dataPath = process.env.DATA_PATH;

	if (!dataPath) {
		throw new Error("DATA_PATH environment variable is not defined");
	}

	const data = await fs.readFile(dataPath);

	const tasks = JSON.parse(data.toString());
	// console.log(z.array(taskSchema).parse(tasks));
	return z.array(taskSchema).parse(tasks);
}

const TaskPage = async () => {
	const tasks = await getTasks();

	return (
		<>
			<div className='md:hidden'>
				<Image
					src=''
					width={1280}
					height={998}
					alt='Playground'
					className='block dark:hidden'
				/>
				<Image
					src=''
					width={1280}
					height={998}
					alt='Playground'
					className='hidden dark:block'
				/>
			</div>
			<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
						<p className='text-muted-foreground'>
							Here&apos;s a list of your tasks for this month!
						</p>
					</div>
					<div className='flex items-center space-x-2'>{/* <UserNav /> */}</div>
				</div>
				{tasks && <DataTable data={tasks} columns={columns} />}
			</div>
		</>
	);
};

export default TaskPage;
