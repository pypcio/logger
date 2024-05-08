"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { getUserCurrentMembershipInfoByOrgID } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { unstable_update } from "@/auth";

interface Props {
	organizationId: string;
}

const ButtonTest = ({ organizationId }: Props) => {
	const { data: session, update } = useSession();
	const handleUpdate = async () => {
		try {
			const member = await getUserCurrentMembershipInfoByOrgID(organizationId);
			if (!member || !session) {
				console.log("You do not belong to organization");
				return;
			}

			const newSession = await unstable_update({
				...session,
				user: {
					...session.user,
					organizationId: member.organizationId,
					role: member.role,
				},
			});
		} catch (err) {
			console.log("Error during update: ", err);
		}
	};

	return <Button onClick={handleUpdate}>Update User</Button>;
};

export default ButtonTest;
