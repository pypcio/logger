"use client";
import { getUserCurrentMembershipInfoByOrgID } from "@/lib/auth";
import prisma from "@/prisma/client";
import { useSession } from "next-auth/react";

interface Props {
	organizationId: string;
}

// export const updateUserSession = async ({ organizationId }: Props) => {
// 	const { data: session, update } = useSession();
// 	const member = await getUserCurrentMembershipInfoByOrgID(organizationId);
// 	if (!member) return { error: "You do not belong to organization" };

// 	const newSession = await update({
// 		...session,
// 		user: {
// 			...session.user,
// 			organizationId: member.organizationId,
// 			role: member.role,
// 		},
// 	});
// 	return newSession;
// };
