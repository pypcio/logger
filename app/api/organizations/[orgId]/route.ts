import { updateOrganizationSchema } from "@/schemas/api-schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { getOrganizationByName } from "@/data/organization";
import { UserRole } from "@prisma/client";

//ADMIN or OWNER permission needed
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { orgId: string } }
) {
	const body = await request.json();
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);

	const organizationValidation = updateOrganizationSchema.safeParse(body);
	if (!organizationValidation.success)
		return NextResponse.json(organizationValidation.error.errors, {
			status: 400,
		});
	const { name, stripe } = organizationValidation.data;
	//check if organization exisits
	const existingOrganization = await prisma.organization.findUnique({
		where: { id: params.orgId },
	});
	if (!existingOrganization)
		return NextResponse.json(
			{ error: "Organization not found" },
			{ status: 404 }
		);
	// check if user has permission
	const validMembership = await prisma.organizationMembership.findUnique({
		where: {
			userId_organizationId: {
				userId: user.id!,
				organizationId: existingOrganization.id,
			},
		},
	});
	if (!validMembership)
		return NextResponse.json(
			{ error: "User does not belong to Organization" },
			{ status: 400 }
		);

	if (validMembership.role === UserRole.USER)
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });

	//update Organization
	const updateOrganization = await prisma.organization.update({
		where: { id: params.orgId },
		data: {
			name,
			stripeCustomerId: stripe,
		},
	});
	return NextResponse.json(updateOrganization);
}
//ADMIN or OWNER permission needed
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { orgId: string } }
) {
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	//check if organization exisits
	const existingOrganization = await prisma.organization.findUnique({
		where: { id: params.orgId },
	});
	if (!existingOrganization)
		return NextResponse.json(
			{ error: "Organization not found" },
			{ status: 404 }
		);
	// check if user has permission
	const validMembership = await prisma.organizationMembership.findUnique({
		where: {
			userId_organizationId: {
				userId: user.id!,
				organizationId: existingOrganization.id,
			},
		},
	});
	if (!validMembership)
		return NextResponse.json(
			{ error: "User does not belong to Organization" },
			{ status: 400 }
		);

	if (validMembership.role === UserRole.USER)
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });

	const deleteOrg = await prisma.organization.delete({
		where: { id: params.orgId },
	});

	return NextResponse.json({});
}

//only membership required to get info
export async function GET(
	request: NextRequest,
	{ params }: { params: { orgId: string } }
) {
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	//check if organization exisits
	const existingOrganization = await prisma.organization.findUnique({
		where: { id: params.orgId },
	});
	if (!existingOrganization)
		return NextResponse.json(
			{ error: "Organization not found" },
			{ status: 404 }
		);
	// check if user has permission
	const validMembership = await prisma.organizationMembership.findUnique({
		where: {
			userId_organizationId: {
				userId: user.id!,
				organizationId: existingOrganization.id,
			},
		},
	});
	if (!validMembership)
		return NextResponse.json(
			{ error: "User does not belong to Organization" },
			{ status: 400 }
		);

	const getOrg = await prisma.organization.findUnique({
		where: { id: params.orgId },
	});
	return NextResponse.json(getOrg);
}
