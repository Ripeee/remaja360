import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params; // Destructure the 'id' from params

	// Validate if 'id' is a number
	if (isNaN(Number(id))) {
		return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
	}

	try {
		const detailUser = await prisma.user.findUnique({
			where: { id: Number(id) },
		});

		if (!detailUser) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json(detailUser);
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json(
			{ message: "Internal server error", error },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	try {
		const body = await req.json();
		const userId = parseInt(id);

		if (isNaN(userId)) {
			return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
		}

		// Optional: Check if the user exists
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Check if the email is being updated and is already in use
		if (body.email && body.email !== user.email) {
			const existingUserWithEmail = await prisma.user.findUnique({
				where: { email: body.email },
			});

			if (existingUserWithEmail) {
				return NextResponse.json(
					{ error: "Email already in use" },
					{ status: 400 },
				);
			}
		}

		// Optionally, format the date_birth
		const formattedDate = new Date(body.date_birth).toISOString().split("T")[0];

		// Update user
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				...body,
				date_birth: formattedDate,
			},
		});

		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		console.error("Error updating user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	
	const { id } = await params; // Get id from the dynamic route parameter

	try {
		// Get the data to update from the request body
		const body = await req.json();

		// Validate that id exists in the body
		if (isNaN(Number(id))) {
			return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
		}

		// Perform the update operation
		const updatedUser = await prisma.user.update({
			where: { id: Number(id) }, // Use the id from the route params
			data: body, // Assuming the body contains fields to update
		});

		// Return the updated user as the response
		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		console.error("Error updating user:", error);
		return NextResponse.json(
			{ message: "Failed to update user", error },
			{ status: 500 },
		);
	}
}
