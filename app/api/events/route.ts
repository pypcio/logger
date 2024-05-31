import { currentUser } from "@/lib/auth";
import { parseJsonSafely } from "@/lib/utils";
import prisma from "@/prisma/client";
import { actionSchema } from "@/schemas/api-schema";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { actionDataArraySchema } from "@/schemas/data-table";
import { actionDataTableViewArraySchema } from "@/app/control-panel/data/schema";
//get actions from entity
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const eventGroupId = searchParams.get("eventGroupId");
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
	if (!eventGroupId) {
		return NextResponse.json(
			{ error: "Invalid query parameters" },
			{ status: 400 }
		);
	}
	//filter eventGroups based on filters:
	try {
		const eventGroup = await prisma.eventGroup.findUnique({
			where: { id: eventGroupId },
		});
		if (!eventGroup)
			return NextResponse.json(
				{ error: "EventGroup not found." },
				{ status: 404 }
			);
		const events = await prisma.event.findMany({
			where: { eventGroupId: eventGroup.id },
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
