"use client";
import React, { useState } from "react";
// import { updateUser } from "@/actions/update-user";
import { useUserByAuth, useUserMembershipsInfo } from "@/lib/services/queries";
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
import {
	Badge,
	Code,
	DataList,
	Flex,
	IconButton,
	Link,
	Spinner,
} from "@radix-ui/themes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import CopyToClipboardIcon from "../copy-to-clipboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader, LoaderCircle } from "lucide-react";
import OrganizationName from "../organization-name";

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
								organizationName: member.organization.name,
							},
						});
						setSuccess("Redirecting...");
						router.push(`/monitoring/${plantId}`);
					} catch (error) {
						toast({
							variant: "destructive",
							title: "Oh no! Could not update session!",
							description: "Reload page or contact your Admin",
						});
					}
				}
			}
		} catch (err) {
			const currentDate = new Date();
			const sexyDate = formatSexyDate(currentDate);
			toast({
				variant: "destructive",
				title: "Oh no! Something went wrong!",
				description: sexyDate,
			});
		}
	};

	// const { data: user, isLoading: isUserLoading } = useUserByAuth();
	const { data: membershipsInfo, error, isLoading } = useUserMembershipsInfo();

	return (
		<div className='container relative flex flex-col justify-center items-center my-12'>
			<div className='flex justify-center items-start border rounded-lg w-5/6 mb-8 p-4 shadow-md overflow-hidden'>
				<div className=' flex gap-16 justify-center items-center px-16'>
					<Avatar className='w-28 h-28 flex-0 m-auto'>
						<AvatarImage
							src={session?.user.image!}
							className='cursor-pointer bg-secondary'
							referrerPolicy='no-referrer'
						/>
						<AvatarFallback>
							<FaUser className='w-28 h-28 opacity-50' />
						</AvatarFallback>
					</Avatar>
					<div className='w-full overflow-auto min-w-[200px] text-sm'>
						<DataList.Root size='1'>
							<DataList.Item align='center'>
								<DataList.Label minWidth='88px'>Status</DataList.Label>
								{isLoading ? (
									<Skeleton className='h-3 w-30'></Skeleton>
								) : (
									<DataList.Value>
										<Badge color='jade' variant='soft' radius='full'>
											Authorized
										</Badge>
									</DataList.Value>
								)}
							</DataList.Item>
							<DataList.Item>
								<DataList.Label minWidth='88px'>ID</DataList.Label>
								{isLoading ? (
									<Skeleton className='h-3 w-32'></Skeleton>
								) : (
									<DataList.Value>
										<Flex align='center' gap='4'>
											<Code variant='ghost'>{session?.user.id}</Code>
											<CopyToClipboardIcon text={session?.user.id!} />
										</Flex>
									</DataList.Value>
								)}
							</DataList.Item>
							<DataList.Item>
								<DataList.Label minWidth='88px'>Name</DataList.Label>
								{isLoading ? (
									<Skeleton className='h-3 w-32'></Skeleton>
								) : (
									<DataList.Value>{session?.user.name}</DataList.Value>
								)}
							</DataList.Item>
							<DataList.Item>
								<DataList.Label minWidth='88px'>Email</DataList.Label>
								{isLoading ? (
									<Skeleton className='h-3 w-32'></Skeleton>
								) : (
									<DataList.Value>
										<Link href={session?.user.email || ""}>
											{session?.user.email}
										</Link>
									</DataList.Value>
								)}
							</DataList.Item>
							<DataList.Item>
								<DataList.Label minWidth='88px'>Company</DataList.Label>
								{isLoading ? (
									<Skeleton className='h-3 w-32'></Skeleton>
								) : (
									<DataList.Value>
										<Link
											target='_blank'
											href={`https://${session?.user.company}`}>
											{session?.user.company || "<i> No Company </i>"}
										</Link>
									</DataList.Value>
								)}
							</DataList.Item>
						</DataList.Root>
					</div>
				</div>
			</div>
			<div className='flex flex-col justify-center items-center w-5/6 rounded-lg border shadow-md py-8 '>
				<p className=' w-full text-center mb-2 font-semibold'>
					Select Organization
				</p>
				<div className='h-auto flex w-4/6 flex-col justify-center items-center my-4'>
					<Command className=' w-full p-4 m-auto h-full'>
						<CommandInput placeholder='Type a plant or search...' />
						<div className='rounded-lg  border  h-full overflow-y-auto'>
							<CommandList className='h-full'>
								<CommandEmpty>
									{isLoading ? (
										<Flex gap='2' align='center' justify='center'>
											<LoaderCircle className='animate-spin text-muted' />{" "}
											{/* <span className='text-sm'>Loading...</span> */}
										</Flex>
									) : (
										<p className='text-sm text-muted-foreground'>
											No results found. <br /> Add{" "}
											<Link href='/settings/add-organization'>
												Organization
											</Link>
										</p>
									)}
								</CommandEmpty>
								{membershipsInfo?.map(({ organization }) => {
									return (
										<>
											<CommandGroup
												key={organization.id}
												heading={organization.name}>
												{organization.plants!.length > 0 &&
													organization.plants!.map((plant) => (
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
						</div>
					</Command>
				</div>
				{onSuccess && <FormSuccess message={onSuccess} />}
			</div>
		</div>
	);
};

export default SelectOrgMenu;
