import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { plantId: string } }
) {
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	if (user.role === UserRole.USER || !user.role || !user.organizationId)
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	//return if there is no plantId param
	if (!params.plantId) {
		return NextResponse.json(
			{ error: "Bad request- no plantId." },
			{ status: 400 }
		);
	}

	try {
		// const organizationId = request.nextUrl.searchParams.get("organizationId");
		const existingOrganization = await prisma.organization.findUnique({
			where: { id: user.organizationId },
			include: {
				plants: {
					select: {
						id: true,
					},
				},
			},
		});
		if (!existingOrganization)
			return NextResponse.json(
				{ error: "Organization not found." },
				{ status: 404 }
			);
		//return actionControls for only one plant
		const actionControlForOrg = await prisma.actionControl.findMany({
			where: { plantId: params.plantId },
			include: {
				action: {
					select: {
						name: true,
						unit: true,
					},
				},
			},
		});
		if (!actionControlForOrg)
			return NextResponse.json(
				{ error: "Control actions not found." },
				{ status: 404 }
			);
		return NextResponse.json(actionControlForOrg);
	} catch (error) {
		return NextResponse.json(
			{ error: "Could not fetch data" },
			{ status: 400 }
		);
	}

	//return
}
