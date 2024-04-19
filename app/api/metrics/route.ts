import { NextResponse, type NextRequest } from "next/server";

export function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const stringQuery = searchParams.toString();
	const query = searchParams.get("query");
	// query is "hello" for /api/search?query=hello
	return NextResponse.json({ data: stringQuery });
}
