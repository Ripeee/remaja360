import { write, utils } from "xlsx";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req: Request) {
  // Sample data
  try {
		// Extract token from Authorization header
		const authHeader = req.headers.get("Authorization");
		if (!authHeader) {
			return NextResponse.json(
				{ error: "Authorization header is required." },
				{ status: 401 },
			);
		}

		const token = authHeader.split(" ")[1];
		if (!token) {
			return NextResponse.json(
				{ error: "Authorization token is required." },
				{ status: 401 },
			);
		}

		// Verify the JWT token
		const secret = new TextEncoder().encode(
			process.env.JWT_SECRET || "default_secret",
		);
		try {
			await jwtVerify(token, secret);
		} catch {
			return NextResponse.json(
				{ error: "Invalid or expired token." },
				{ status: 401 },
			);
		}

		// Fetch result and their options
		const result = await prisma.result.findMany();
		const user = await prisma.user.findMany();

		if (result.length === 0) {
			return NextResponse.json(
				{ error: "No result found for the specified quiz." },
				{ status: 404 },
			);
		}

		// Merge user and result data
		const mergedData = result.map((res) => {
			const userData = user.find((u) => u.id === res.userId);
			return {
				...res,
				...userData,
			};
		});

		// Convert merged data to worksheet
		const worksheet = utils.json_to_sheet(mergedData);

		// Create workbook and append the worksheet
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Sheet1");

		// Write the Excel file to a buffer
		const buffer = write(workbook, { bookType: "xlsx", type: "buffer" });

		// Set headers for file download
		const headers = new Headers({
			"Content-Disposition": "attachment; filename=data.xlsx",
			"Content-Type":
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});

		return new NextResponse(buffer, { headers });
	} catch (err) {
      console.error("Error fetching question:", err);
      return NextResponse.json(
        { error: "An unexpected error occurred while processing the request." },
        { status: 500 },
      );
    }
}
