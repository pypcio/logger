import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./(components)/side-nav";

export const metadata: Metadata = {
	title: "User Settings",
	description: "User Settings",
};

const sidebarNavItems = [
	{
		title: "Profile",
		href: "/settings/user",
	},
	{
		title: "Account",
		href: "/settings/user/account",
	},
	{
		title: "Appearance",
		href: "/settings/user/appearance",
	},
	{
		title: "Notifications",
		href: "/settings/user/notifications",
	},
	{
		title: "Display",
		href: "/settings/user/display",
	},
];

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<>
			<div className='md:hidden'>
				<Image
					src='/examples/forms-light.png'
					width={1280}
					height={791}
					alt='Forms'
					className='block dark:hidden'
				/>
				<Image
					src='/examples/forms-dark.png'
					width={1280}
					height={791}
					alt='Forms'
					className='hidden dark:block'
				/>
			</div>
			<div className='hidden space-y-6 p-10 pb-16 md:block'>
				<div className='space-y-0.5'>
					<h2 className='text-2xl font-bold tracking-tight'>User Settings</h2>
					<p className='text-muted-foreground'>
						Manage your account settings and set e-mail preferences.
					</p>
				</div>
				<Separator className='my-6' />
				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/5'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex-1 lg:max-w-2xl'>{children}</div>
				</div>
			</div>
		</>
	);
}
