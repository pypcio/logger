"use client";
import { useEffect, useState } from "react";
import { useUserByAuth } from "@/lib/services/queries";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useOrganizationEntitiesActions } from "./query";
import { useSession } from "next-auth/react";

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
		<div className='container mx-auto py-10'>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error loading actions: {error.message}</p>
			) : !actions ? (
				<p>No actions available</p>
			) : (
				<DataTable columns={columns} data={actions} />
			)}
		</div>
	);
}
