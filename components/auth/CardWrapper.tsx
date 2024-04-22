"use client";
import React, { PropsWithChildren } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/Card";
import Header from "@/components/auth/Header";
import Socials from "./Socials";
import BackButton from "./BackButton";
interface CardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

const CardWrapper = ({
	children,
	headerLabel,
	backButtonHref,
	backButtonLabel,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className='w-[400px] shadow-md'>
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Socials />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
};

export default CardWrapper;
