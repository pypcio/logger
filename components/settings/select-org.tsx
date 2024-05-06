"use client";
import React, { useState } from "react";
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
import { useToast } from "../ui/use-toast";
import { formatSexyDate } from "@/lib/utils";
import FormSuccess from "../form-success";
import { Flex, Spinner } from "@radix-ui/themes";

const SelectOrgMenu = () => {
	const { data: session, update } = useSession();
	const router = useRouter();
	const { toast } = useToast();
	const [onSuccess, setSuccess] = useState<string | undefined>("");
	const handleUpdate = async (organizationId: string, plantId: string) => {
		try {
			setSuccess("");
			if (session && session.user && session.user.id) {
				const member = await getUserCurrentMembershipInfo(organizationId);
				if (member) {
					try {
						await update({
							...session,
							user: {
								...session.user,
								organizationId: member.organizationId,
								role: member.role,
							},
						});
						setSuccess("Redirecting...");
						router.push(`/monitoring/${plantId}`);
					} catch (error) {
						console.log("wchodze tu 1: ");
						toast({
							variant: "destructive",
							title: "Oh no! Could not update session!",
							description: "Reload page or contact your Admin",
						});
					}
				}
			}
		} catch (err) {
			console.log("wchodze tu 2: ");
			const currentDate = new Date();
			const sexyDate = formatSexyDate(currentDate);
			toast({
				variant: "destructive",
				title: "Oh no! Something went wrong!",
				description: sexyDate,
			});
		}
	};

	const { data: membershipsInfo, error, isLoading } = useUserMembershipsInfo();

	return (
		<CardWrapper
			mainLabel='Select Organization'
			headerLabel='Welcome back'
			className='flex flex-col justify-center items-center w-5/6 rounded-lg border shadow-md'>
			<Command className='grow w-[80%] p-4 rounded-lg border '>
				<CommandInput placeholder='Type a plant or search...' />
				<CommandList>
					<CommandEmpty>
						{isLoading ? (
							<Flex gap='2' align='center' justify='center'>
								<Spinner size='3' /> Loading...
							</Flex>
						) : (
							"No results found."
						)}
					</CommandEmpty>
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
													className='text-sm cursor-pointer text-muted-foreground'>
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
			{onSuccess && <FormSuccess message={onSuccess} />}
		</CardWrapper>
	);
};

export default SelectOrgMenu;
