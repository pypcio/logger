"use client";
import React from "react";
// import { updateUser } from "@/actions/update-user";
import { useUserMembershipsInfo } from "@/lib/services/queries";
import CardWrapper from "@/components/auth/CardWrapper";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
} from "@/components/ui/command";
import { useSession } from "next-auth/react";
import { getUserCurrentMembershipInfo } from "@/actions/update-user";
import { useRouter } from "next/navigation";

const SelectOrgMenu = () => {
	const { data: session, update, status } = useSession();
	const router = useRouter();
	const handleUpdate = async (organizationId: string, plantId: string) => {
		try {
			// console.log("organizationid: ", organizationId);
			// await updateUser(organizationId);
			if (session && session.user && session.user.id) {
				const member = await getUserCurrentMembershipInfo(
					session.user.id,
					organizationId
				);
				if (member) {
					await update({
						...session,
						user: {
							...session.user,
							organizationId: member.organizationId,
							role: member.role,
						},
					});
					router.push(`/monitoring/${plantId}`);
				}
			}
		} catch (err) {
			console.error("Error during update: ", err);
		}
	};

	const { data: membershipsInfo, error, isLoading } = useUserMembershipsInfo();

	return (
		<CardWrapper
			mainLabel='Select Organization'
			headerLabel='Welcome back'
			className='flex flex-col justify-center items-center w-5/6 rounded-lg border shadow-md'>
			<Command className=' grow w-full p-4 rounded-lg border '>
				<CommandInput placeholder='Type a plant or search...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{membershipsInfo?.map(({ organization }, index) => {
						return (
							<>
								<CommandGroup key={index} heading={organization.name}>
									{organization.plants.length > 0 &&
										organization.plants.map((plant) => (
											<CommandItem key={plant.id}>
												<button
													onClick={() =>
														handleUpdate(organization.id, plant.id)
													}
													className='text-base cursor-pointer'>
													{plant.name}
												</button>
											</CommandItem>
										))}
								</CommandGroup>
								<CommandSeparator />
							</>
						);
					})}
				</CommandList>
			</Command>
		</CardWrapper>
	);
};

export default SelectOrgMenu;
