"use client";

import { useSessionUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

const SessionInfo = () => {
	const { data: session, status } = useSession({ required: true });
	if (status === "loading") {
		return "Loading or not authenticated...";
	}

	return <div>{JSON.stringify(session.user!)}</div>;
};

export default SessionInfo;
