// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Replace with your secret key
const secretKey = new TextEncoder().encode(
	process.env.JWT_SECRET || "your-secret-key",
);

export async function middleware(req: NextRequest) {
	const token = req.cookies.get("authToken")?.value;

	// Allow access to public routes (e.g., login)
	if (req.nextUrl.pathname.startsWith("/api/auth/login")) {
		return NextResponse.next();
	}

	// Validate the token
	if (token) {
		try {
			await jwtVerify(token, secretKey);
			return NextResponse.next(); // Token is valid
    } catch (error) {
      console.log(error, 'err')
			return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if invalid
		}
	}

	// No token, redirect to login
	return NextResponse.redirect(new URL("/login", req.url));
}

// Apply middleware to protected routes only
export const config = {
	matcher: ["/protected-route/:path*", "/another-protected-route/:path*"], // Adjust paths as needed
};
