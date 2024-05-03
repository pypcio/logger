"use client";

import { useSessionUser } from "@/hooks/use-session-user";

const SessionInfo = () => {
	const user = useSessionUser();
	return <div>{JSON.stringify(user)}</div>;
};

export default SessionInfo;
