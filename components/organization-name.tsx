import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a skeleton component for loading state
import { OrgMembershipInfo } from "@/lib/types/prisma";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const OrganizationName = () => {
	const { data: session, status } = useSession();
	const [organizationName, setOrganizationName] = useState<string | null>();

	useEffect(() => {
		const fetchOrganizationName = async () => {
			if (session?.user?.id && session?.user?.organizationId) {
				try {
					const response = await axios.get<OrgMembershipInfo>("/api/members");
					if (response.status !== 200)
						throw new Error("Failed to fetch organization");

					const { organization } = response.data;
					setOrganizationName(organization.name);
				} catch (error) {
					console.error("Failed to fetch organization name:", error);
					setOrganizationName(null);
				}
			}
		};

		fetchOrganizationName();
	}, [session]);
	if (organizationName) {
		return (
			<p className='text-center'>
				{organizationName || "Organization not found"}
			</p>
		);
	}

	return <Skeleton className='h-3 w-30'></Skeleton>;
};
export default OrganizationName;
