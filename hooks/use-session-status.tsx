import { useSession } from "next-auth/react";

export const useSessionStatus = () => {
	const session = useSession();
	return session.status;
};
