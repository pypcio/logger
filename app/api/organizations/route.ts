import { getOrganizationByName } from "@/data/organization";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { organizationSchema } from "@/schemas/api-schema";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	if (user.role === UserRole.USER || !user.role)
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });

	const validateOrganization = organizationSchema.safeParse(body);
	if (!validateOrganization.success)
		return NextResponse.json({ error: "Invalid name" });

	const { name } = validateOrganization.data;

	const existingUser = await getUserById(user.id!);
	if (!existingUser)
		return NextResponse.json({ error: "User does not exists" });

	const existingOrg = await getOrganizationByName(name);
	if (existingOrg) return { error: "Organization already exists" };

	try {
		const newOrganization = await prisma.organization.create({
			data: {
				name,
				members: {
					create: [
						{
							user: { connect: { id: existingUser.id } },
							role: UserRole.OWNER, // Assuming 'OWNER' is a valid role
						},
					],
				},
			},
		});
		return NextResponse.json(newOrganization, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Could not create Organization" },
			{ status: 400 }
		);
	}
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const plants = searchParams.get("plants") ?? "";
	const devices = searchParams.get("devices") ?? "";
	const user = await currentUser();
	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in." },
			{ status: 401 }
		);
	}
	if (
		// user.role === UserRole.USER ||
		!user.id ||
		!user.role ||
		!user.organizationId
	) {
		return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	}
	const fetchedOrgData = await prisma.organizationMembership.findMany({
		where: {
			userId: user.id,
		},
		include: {
			organization: {
				select: {
					name: true,
					id: true,
					plants: {
						select: {
							name: true,
							id: true,
						},
					},
				},
			},
		},
	});
	if (!fetchedOrgData)
		return NextResponse.json(
			{ error: "No organization info found." },
			{ status: 404 }
		);
	// Mapping to apply aliases and restructure data
	// const organizations = fetchedOrgData.map((org) => ({
	// 	organizationName: org.organization.name,
	// 	plants: org.organization.plants.map((plant) => ({
	// 		plantName: plant.name,
	// 	})),
	// }));
	return NextResponse.json(fetchedOrgData, { status: 200 });
}
