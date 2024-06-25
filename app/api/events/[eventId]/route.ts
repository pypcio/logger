import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { eventId: string } }
) {
	const searchParams = request.nextUrl.searchParams;
	const deviceId = searchParams.get("deviceId");
	const eventId = parseInt(params.eventId);
	const user = await currentUser();

	if (!eventId || !deviceId) {
		return NextResponse.json({ error: "Invalid params" }, { status: 400 });
	}
	if (!user) {
		return NextResponse.json(
			{ error: "You are not logged in." },
			{ status: 401 }
		);
	}
	// if (
	// 	user.role === UserRole.USER ||
	// 	!user.id ||
	// 	!user.role ||
	// 	!user.organizationId
	// ) {
	// 	return NextResponse.json({ error: "User not permitted" }, { status: 403 });
	// }
	try {
		const event = await prisma.event.findUnique({
			where: { deviceId_id: { id: eventId, deviceId } },
		});
		if (!event)
			return NextResponse.json({ error: "Event not found." }, { status: 404 });
		return NextResponse.json(event);
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong." },
			{ status: 500 }
		);
	}
}
