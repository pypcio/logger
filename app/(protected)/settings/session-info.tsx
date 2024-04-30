"use client";
import { useSession } from "next-auth/react";

const SessionInfo = () => {
	const { data: session, update, status } = useSession();
	return (
		<div>
			{session?.user && (
				<p>
					{session?.user.name} {session?.user.email} {session?.user.id} {status}
				</p>
			)}
		</div>
	);
};

export default SessionInfo;
