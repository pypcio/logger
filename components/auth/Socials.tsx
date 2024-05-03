"use client";
import { ProviderElement } from "@/lib/types/NavItems";
import { Flex } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signin } from "@/actions/signin";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Socials = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const router = useRouter();
	const onClick = (provider: string) => {
		signin(provider, { redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT });
	};

	return (
		<div className='flex justify-center w-full gap-x-2'>
			{providers.map((provider: ProviderElement) => {
				return (
					<Button
						size='lg'
						className='rounded-sm'
						variant='outline'
						onClick={() => onClick(provider.name)}
						key={provider.label}>
						{provider.icon} {provider.label}
					</Button>
				);
			})}
		</div>
	);
};

const providers: ProviderElement[] = [
	{
		label: "Google",
		name: "google",
		icon: <FaGoogle className='mr-2 h-4 w-4' />,
	},
	{
		label: "GitHub",
		name: "github",
		icon: <FaGithub className='mr-2 h-4 w-4' />,
	},
];

export default Socials;
