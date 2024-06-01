import { cn } from "@/lib/utils";
import { actionStatusColors } from "@/schemas/schemas-types";
import { ActionStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { ClassValue } from "clsx";
import React, { PropsWithRef } from "react";

interface Props {
	label: ActionStatus;
	className?: string;
}
const BadgeActionStatus = ({ label, className }: Props) => {
	const formatedStatus = label.charAt(0) + label.slice(1).toLowerCase();
	return (
		<Badge
			className={cn(className, "!rounded-[3px] !px-1")}
			color={actionStatusColors[label]}>
			{formatedStatus}
		</Badge>
	);
};

export default BadgeActionStatus;
