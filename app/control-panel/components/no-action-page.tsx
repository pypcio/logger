import { Button } from "@/components/ui/button";
import { FilePlusIcon } from "@radix-ui/react-icons";
import React from "react";

const NoActionPage = () => {
	return (
		<div className='flex flex-col rounded-md m-auto space-y-4'>
			<p className='text-lg mt-20'>
				Sorry, could not find any action for you Organization.
			</p>
			<Button
				size='sm'
				className='h-8 border-dashed bg-primary m-auto'
				// onClick={() => router.push("/control-panel/new")}
			>
				<FilePlusIcon className='mr-2 h-4 w-4' />
				<a className='m-0 p-0' href='/control-panel/new'>
					New Action
				</a>
			</Button>
		</div>
	);
};

export default NoActionPage;
