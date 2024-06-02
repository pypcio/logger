"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import LoadingPanelPage from "./components/spinner-page";
import { useOrganizationEntitiesActions } from "./data/query";

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
			<div className='md:hidden'></div>
			<div className='hidden h-full flex-1 flex-col space-y-4 p-8 md:flex'>
				<div className='flex items-center justify-between space-y-2'>
					<div>
						<h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
						<p className='text-muted-foreground'>
							Here&apos;s a list of recent events in your organization!
						</p>
					</div>
					<div className='flex items-center space-x-2'>{/* <UserNav /> */}</div>
				</div>
				{actions ? (
					<DataTable data={actions} columns={columns} />
				) : (
					<LoadingPanelPage />
				)}
				{/* <LoadingPanelPage /> */}
			</div>
		</>
	);
}
