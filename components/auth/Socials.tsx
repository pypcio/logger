"use client";
import { ProviderElement } from "@/lib/types/NavItems";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Socials = () => {
	const router = useRouter();
	const providers: ProviderElement[] = [
		{ label: "Google", path: "/auth/login/google", icon: <FaGoogle /> },
		{ label: "GitHub", path: "/auth/login/github", icon: <FaGithub /> },
	];
	return (
		<Flex align='center' gap='8' justify='center'>
			{providers.map((provider: ProviderElement) => {
				return (
					<Button
						onClick={() => router.push(provider.path)}
						key={provider.label}
						highContrast
						color='indigo'
						variant='solid'
						size='3'
						radius='medium'>
						{provider.icon} {provider.label}
					</Button>
				);
			})}
		</Flex>
	);
};

export default Socials;
