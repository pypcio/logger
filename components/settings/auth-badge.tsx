import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
	string,
	{ label: string; color: "red" | "violet" | "green" }
> = {
	false: { label: "Not Authorized", color: "red" },
	true: { label: "Authorized", color: "green" },
};

interface Props {
	emailVerified: string | null;
}

const AuthStatusBadge = ({ emailVerified }: Props) => {
	const status = emailVerified ? "true" : "false";

	return (
		<Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
	);
};

export default AuthStatusBadge;
