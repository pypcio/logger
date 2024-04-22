"use client";
import { ProviderElement } from "@/lib/types/NavItems";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
const Socials = () => {
	const router = useRouter();
	const providers: ProviderElement[] = [
		{
			label: "Google",
			path: "/auth/login/google",
			icon: <FaGoogle className='mr-2 h-4 w-4' />,
		},
		{
			label: "GitHub",
			path: "/auth/login/github",
			icon: <FaGithub className='mr-2 h-4 w-4' />,
		},
	];
	return (
		<div className='flex justify-center w-full gap-x-2'>
			{providers.map((provider: ProviderElement) => {
				return (
					<Button
						size='lg'
						className='rounded-sm'
						variant='outline'
						onClick={() => router.push(provider.path)}
						key={provider.label}>
						{provider.icon} {provider.label}
					</Button>
				);
			})}
		</div>
	);
};

export default Socials;
