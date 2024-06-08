import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { LoadingSpinner } from "@/components/ui/spinner";

const LoadingPanelPage = () => {
	return (
		<>
			<div className='flex m-0'>
				<Skeleton className='w-[7%] ml-2 mr-auto mt-3 h-8 rounded-md' />
				<Skeleton className='w-[7%] mx-4 mt-3 h-8 rounded-md bg-primary' />
				<Skeleton className='w-[7%] mr-2 mt-3 h-8 rounded-md' />
			</div>
			<div className='flex-col justify-center items-center h-[430px] mx-2 bg-gray-900 border-slate-400 rounded-md mt-4'>
				{/* <Skeleton className='w-full h-full mt-8'> */}
				<div className='flex-col gap-6 my-8 '>
					{/* <Skeleton className='w-5/6 h-full mt-8' /> */}

					<Skeleton className='w-[96%] mx-auto my-4 h-12 rounded-md' />
					<Skeleton className='w-[96%] mx-auto my-4 h-12 rounded-md' />
					<Skeleton className='w-[96%] mx-auto my-4 h-12 rounded-md' />
					<Skeleton className='w-[96%] mx-auto my-4 h-12 rounded-md' />
					<Skeleton className='w-[96%] mx-auto my-4 h-12 rounded-md' />
					<Skeleton className='w-[96%] mx-auto my-4 h-12 rounded-md' />
				</div>
				{/* </Skeleton> */}
			</div>
		</>
	);
};
export default LoadingPanelPage;
