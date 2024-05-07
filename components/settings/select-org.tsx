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

const SelectOrgMenu = ({ text }: { text: string }) => {
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
	//testing
	const text_id = "u_2J89JSA4GJ";
	const isLoading = false;
	const membershipsInfo: any = [];
	// const { data: membershipsInfo, error, isLoading } = useUserMembershipsInfo();

	return (
		<div className='flex flex-col justify-center items-center w-full '>
			<div className='flex flex-col justify- items-start bg-white w-5/6 mb-8 pl-0 p-8 shadow-md'>
				<div className=' flex gap-20 justify-center items-center px-20'>
					<Avatar className='w-28 h-28 flex-0 m-auto'>
						<AvatarImage
							src='https://github.com/shadcn.png'
							className='cursor-pointer bg-secondary'
							referrerPolicy='no-referrer'
						/>
						<AvatarFallback>
							<FaUser className='w-28 h-28 opacity-50' />
						</AvatarFallback>
					</Avatar>
					<DataList.Root size='1'>
						<DataList.Item align='center'>
							<DataList.Label minWidth='88px'>Status</DataList.Label>
							<DataList.Value>
								<Badge color='jade' variant='soft' radius='full'>
									Authorized
								</Badge>
							</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label minWidth='88px'>ID</DataList.Label>
							<DataList.Value>
								<Flex align='center' gap='2'>
									<Code variant='ghost'>{text_id}</Code>
									<CopyToClipboardIcon text={text_id} />
								</Flex>
							</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label minWidth='88px'>Name</DataList.Label>
							<DataList.Value>Vlad Moroz</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label minWidth='88px'>Email</DataList.Label>
							<DataList.Value>
								<Link href='mailto:vlad@workos.com'>vlad@workos.com</Link>
							</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label minWidth='88px'>Company</DataList.Label>
							<DataList.Value>
								<Link target='_blank' href='https://workos.com'>
									WorkOS
								</Link>
							</DataList.Value>
						</DataList.Item>
					</DataList.Root>
				</div>
			</div>
			<CardWrapper
				mainLabel=''
				headerLabel=''
				className='flex flex-col justify-center items-center w-5/6 rounded-lg border shadow-md pb-8'>
				<p className='w-full text-center mb-2 font-semibold'>
					Select Organization
				</p>
				<div className='h-auto flex w-4/6 flex-col justify-center items-center rounded-lg border m-auto'>
					<Command className=' w-full p-4 m-auto h-full'>
						<CommandInput placeholder='Type a plant or search...' />
						<div className='rounded-lg border'>
							<CommandList className='h-full'>
								<CommandEmpty>
									{isLoading ? (
										<Flex gap='2' align='center' justify='center'>
											<Spinner size='3' />{" "}
											<span className='text-sm'>Loading...</span>
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
								{/* {membershipsInfo?.map(({ organization }, index) => {
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
					})} */}
							</CommandList>
						</div>
					</Command>
				</div>
				{onSuccess && <FormSuccess message={onSuccess} />}
			</CardWrapper>
		</div>
	);
};

export default SelectOrgMenu;
