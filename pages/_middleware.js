import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET });

	const { pathname } = req.nextUrl;

	// Allow request if the following os true:
	// 1. It's a request for next-auth session & provider fetching
	// 2. Token exists
	if (pathname.includes("/api/auth") || token) {
		return NextResponse.next();
	}

	// Redirect to Login if they don't have a token & they're requesting a
	// protected route
	if (!token && pathname !== "/login") {
		return NextResponse.redirect("/login");
	}
}
