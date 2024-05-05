"use client";
import Header from "@/components/auth/Header";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import BackButton from "./BackButton";
import Socials from "./Socials";
interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel?: string;
	backButtonHref?: string;
	showSocial?: boolean;
	showBackButton?: boolean;
	mainLabel: string;
	className?: string;
}

const CardWrapper = ({
	children,
	headerLabel,
	backButtonHref,
	backButtonLabel,
	showSocial,
	mainLabel,
	showBackButton,
	className,
}: CardWrapperProps) => {
	return (
		<Card className={cn("w-[400px] shadow-md", className)}>
			<CardHeader>
				<Header mainLabel={mainLabel} label={headerLabel} />
			</CardHeader>
			<CardContent className='w-full'>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Socials />
				</CardFooter>
			)}
			{showBackButton && (
				<CardFooter>
					<BackButton
						center={true}
						label={backButtonLabel!}
						href={backButtonHref!}
					/>
				</CardFooter>
			)}
		</Card>
	);
};

export default CardWrapper;
