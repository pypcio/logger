"use client";
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
	MoreHorizontal,
} from "lucide-react";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserOrganizationInfo } from "@/lib/auth";
import { useUserMembershipsInfo } from "@/lib/services/queries";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const labels = [
	"feature",
	"bug",
	"enhancement",
	"documentation",
	"design",
	"question",
	"maintenance",
];

const SelectOrgMenu = () => {
	// const [open, setOpen] = useState(false)
	// const organizations = await getUserOrganizationInfo();
	const { data: membershipsInfo, error, isLoading } = useUserMembershipsInfo();
	// console.log("organizations: ", membershipsInfo);
	return (
		<div className='flex flex-col justify-center items-center'>
			<Command className='rounded-lg border shadow-md w-3/5'>
				<CommandInput placeholder='Type a plant or search...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{membershipsInfo?.map(({ organization }, index) => {
						return (
							<>
								{/* <div className={}> */}
								<CommandGroup key={index} heading={organization.name}>
									{organization.plants.length > 0 &&
										organization.plants.map((plant) => {
											return (
												<CommandItem key={plant.id}>
													{/* //TO DO: add functionality for updating organizationID JWT and Session based on selected plant.
													route user to /monitoring. and focus on choosen plant. */}
													<span className='text-base cursor-pointer'>
														{plant.name}
													</span>
												</CommandItem>
											);
										})}
								</CommandGroup>
								<CommandSeparator />
							</>
						);
					})}
				</CommandList>
			</Command>
			{/* {membershipsInfo?.map((organization, index) => {
				return <p key={index}>{JSON.stringify(organization)}</p>;
			})} */}
		</div>
	);
};
export default SelectOrgMenu;
