import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Import Prisma client

// Initialize Prisma client
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		// Check if email and password are provided
		if (!email || !password) {
			return NextResponse.json(
				{ error: "Email and password are required" },
				{ status: 400 },
			);
		}

		// Query the database for the user with the given email
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		// If the user is not found or password doesn't match, return an error
		if (!user || user.password !== password) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 },
			);
		}

		// Generate JWT token if credentials are correct
		const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
		const token = await new SignJWT({ email })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("1h") // Token expires in 1 hour
			.sign(secret);

		// Return the generated token
		return NextResponse.json(
			{
				token,
				user: {
					id: user.id,
					email: user.email,
					name: user.name, // Include any other data you want to send back
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
