import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";
import NavBar from "./NavBar";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import AuthProvider from "./Provider";
import QueryClientProvider from "./query-provider";
import { currentRole } from "@/lib/auth";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryClientProvider>
			<AuthProvider>
				<html lang='en' className='h-full'>
					<body
						className={cn(
							"h-full bg-background font-sans antialiased flex flex-col",
							fontSans.variable
						)}>
						{/* <Theme accentColor='blue' radius='none' scaling='95%'> */}
						<NavBar />
						<main className=' flex-1 flex flex-col justify-center items-center bg-sky-200'>
							{children}
						</main>
						{/* <ThemePanel /> */}
						{/* </Theme> */}
					</body>
					{/* <ThemePanel /> */}
				</html>
			</AuthProvider>
		</QueryClientProvider>
	);
}
