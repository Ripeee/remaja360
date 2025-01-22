import { SignJWT, decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Import Prisma client

// Initialize Prisma client
const prisma = new PrismaClient();

function getTokenExpiration(token: string) {
	const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

	if (!jwtRegex.test(token)) {
		console.error("Invalid token format");
		return null;
	}

	
	try {
		const decoded = decodeJwt(token); // Decode the JWT payload
		return decoded.exp; // Expiration time in seconds (Unix timestamp)
	} catch (error) {
		console.error("Failed to decode token:", error);
		return null;
	}
}

// function isTokenExpired(token) {
// 	const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
// 	const expirationTime = getTokenExpiration(token);

// 	if (expirationTime) {
// 		return currentTime >= expirationTime; // Check if token is expired
// 	}

// 	return true; // If unable to decode, consider the token invalid
// }

function getRemainingTime(token: string) {
	const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

	if (!jwtRegex.test(token)) {
		console.error("Invalid token format");
		return null;
	}

	const expirationTime = getTokenExpiration(token);
	if (!expirationTime) return 0;

	const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
	return (expirationTime - currentTime) * 2; // Remaining time in seconds
}

// const token = "your-jwt-token-here";
// const remainingTime = getRemainingTime(token);

// if (remainingTime > 0) {
// 	console.log(`Token expires in ${remainingTime} seconds`);
// } else {
// 	console.log("Token has expired");
// }

export async function POST(req: NextRequest) {
	try {
		const { emailOrUsername, password } = await req.json();

		// Validasi input awal
		if (!emailOrUsername || !password) {
			return NextResponse.json(
				{ error: "Email/username and password are required" },
				{ status: 400 }
			);
		}

		// Cek apakah input adalah email atau username
		const isEmail = emailOrUsername.includes("@");
		const user = await prisma.user.findUnique({
			where: isEmail
				? { email: emailOrUsername }
				: { username: emailOrUsername },
		});

		// Validasi user dan password
		if (!user || user.password !== password) {
			return NextResponse.json(
				{ error: "Invalid email/username or password" },
				{ status: 401 }
			);
		}

		// Generate JWT token jika login berhasil
		const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
		const token = await new SignJWT({ id: user.id, email: user.email, username: user.username })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("1h") // Token kedaluwarsa dalam 1 jam
			.sign(secret);

		// Kembalikan response dengan token dan data user
		return NextResponse.json(
			{
				token,
				remainingToken: getRemainingTime(token),
				user: {
					id: user.id,
					email: user.email,
					username: user.username,
					name: user.name, // Tambahkan data lain yang diperlukan
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
