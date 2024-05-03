import { organizationSchema } from "@/schemas/api-schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
export async function POST(request: NextRequest) {
	const body = await request.json();
	const session = await auth();
	console.log("session: ", session);
	const validatedOrganization = organizationSchema.safeParse(body);

	// if (!validatedOrganization.success) {
	// 	return NextResponse.json(validatedOrganization.error.errors, { status: 400 });
	// }
	// //check if plant exists (add in where- org_id: sessionParams.org_id)
	// const findOrganization = await prisma.organization.findUnique({
	// 	where: { name: body.name },
	// });
	// if (findPlant) {
	// 	return NextResponse.json(
	// 		{ error: "Plant already exists." },
	// 		{ status: 400 }
	// 	);
	// }

	// const newPlant = await prisma.plant.create({
	// 	data: {
	// 		name: body.name,
	// 		description: body.description,
	// 		//org_id : sessionParams.org_id
	// 	},
	// });

	return NextResponse.json({}, { status: 201 });
}

//when org introduced, add where {org_id: request.orgId}
export async function GET(request: NextRequest) {
	const user = await currentUser();

	//TO DO: create interface for User to choose which organization they want to be logged in:
	const organization = await prisma.organizationMembership.findFirst({
		where: { userId: user?.id },
	});
	if (!organization) return;

	return NextResponse.json({ status: 200 });
}
