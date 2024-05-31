"use client";
import { useEffect, useState } from "react";
import { useUserByAuth } from "@/lib/services/queries";
import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { useOrganizationEntitiesActions } from "./data/query";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DemoPage() {
	const { data: session, status } = useSession();
	const [organizationId, setOrganizationId] = useState<string | null>(null);

	// Update organizationId when session is available
	useEffect(() => {
		if (status === "authenticated" && session?.user?.organizationId) {
			setOrganizationId(session.user.organizationId);
		}
	}, [session, status]);

	const {
		data: actions,
		isLoading,
		error,
	} = useOrganizationEntitiesActions(organizationId);

	return (
		<>
			<div className='md:hidden'>
				{/* <Image
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
				/> */}
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
				{actions && <DataTable data={actions} columns={columns} />}
			</div>
		</>
	);
}
