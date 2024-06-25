import dynamic from "next/dynamic";
import ActionFormSkeleton from "./loading";
import { auth } from "@/auth";
import { cache } from "react";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
const ActionForm = dynamic(
	() => import("@/components/data-table/action/action-form"),
	{
		ssr: false,
		loading: () => <ActionFormSkeleton />,
	}
);
const fetchDevices = cache((organizationId: string) =>
	prisma.device.findMany({
		where: { plant: { organizationId } },
		select: {
			id: true,
			name: true,
			deviceType: true,
			plant: {
				select: {
					organization: {
						select: { name: true },
					},
				},
			},
		},
	})
);

const NewActionPage = async () => {
	const session = await auth();
	if (session && session.user.organizationId) {
		const devices = await fetchDevices(session.user.organizationId);
		// if (eventGroups) notFound();
		// console.log("eventGroup: ", eventGroups);
		return (
			<div className='container flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0  my-12 w-full'>
				<ActionForm devices={devices} />
			</div>
		);
	}
};

export default NewActionPage;
