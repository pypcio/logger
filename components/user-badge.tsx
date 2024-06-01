import { UserRole } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
const statusMap: Record<
	UserRole,
	{ label: string; color: "cyan" | "orange" | "crimson" }
> = {
	OWNER: { label: "Owner", color: "crimson" },
	ADMIN: { label: "Admin", color: "orange" },
	USER: { label: "User", color: "cyan" },
};

interface Props {
	status: UserRole;
	className?: string;
}

const RoleTypeBadge = ({ status, className }: Props) => {
	return (
		<Badge
			className={cn(className, "!rounded-[3px] !px-1")}
			color={statusMap[status].color}>
			{statusMap[status].label}
		</Badge>
	);
};

export default RoleTypeBadge;
