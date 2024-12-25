// pages/api/auth/login.ts

import { NextRequest, NextResponse } from "next/server";
// import { SignJWT } from "jose";

const users = [{ email: "user@example.com", password: "password123" }];

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email and password are required" },
				{ status: 400 },
			);
		}

		const user = users.find((u) => u.email === email);

		if (!user || user.password !== password) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 },
			);
		}

		// Generating JWT token here if valid credentials
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
