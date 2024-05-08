import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

//get user byId
export async function GET(
	req: NextRequest,
	{ params }: { params: { userId: string } }
) {
	const user = await currentUser();
	if (!user)
		return NextResponse.json(
			{ error: "You are not logged in" },
			{ status: 401 }
		);
	const existingUser = await getUserById(params.userId);
}
