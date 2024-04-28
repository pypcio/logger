import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { auth } from "@/auth";

const AuthProvider = async ({ children }: PropsWithChildren) => {
	const session = await auth();
	return (
		<>
			<SessionProvider session={session}>{children}</SessionProvider>
		</>
	);
};

export default AuthProvider;
