import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
//get actions from entity
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const deviceId = searchParams.get("deviceId");
	const user = await currentUser();
	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in." },
			{ status: 401 }
		);
	}
	// if (!user.role || !user.organizationId) {
	// 	return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	// }
	if (!deviceId) {
		return NextResponse.json(
			{ error: "Invalid query parameters" },
			{ status: 400 }
		);
	}
	//filter eventGroups based on filters:
	try {
		const events = await prisma.event.findMany({
			where: { deviceId },
			select: { id: true, name: true },
		});
		if (!events.length)
			return NextResponse.json({ error: "No Event Found." }, { status: 404 });
		return NextResponse.json(events);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Could not fetch data" },
			{ status: 500 }
		);
	}
}
