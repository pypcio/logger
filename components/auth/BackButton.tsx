import React from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ButtonProps } from "../ui/Button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
	label: string;
	href: string;
	size?: ButtonProps["size"];
	center?: boolean;
}

const BackButton = ({
	label,
	href,
	size = "sm",
	center = false,
}: BackButtonProps) => {
	return (
		<Button
			variant='link'
			className={cn("font-normal", { "w-full": center })}
			size={size}
			asChild>
			<Link href={href}>{label}</Link>
		</Button>
	);
};

export default BackButton;
