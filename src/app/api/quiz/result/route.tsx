import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { quizId, userId, score } = body;

    // Validate input
    if (!quizId || !userId || score === undefined || score === null || typeof score !== 'number' || score < 0 || score > 100) {
      return NextResponse.json(
        { message: "Invalid input. Please provide valid quizId, userId, and score (0-100)." },
        { status: 400 }
      );
    }

    // Insert the result into th e database
    let result;

    try {
      result = await prisma.result.create({
        data: {
          quizId,
          userId,
          score,
        },
      });
    } finally {
      await prisma.$disconnect()
    }
    
    // Return success response
    return NextResponse.json(
      { message: "Result created successfully.", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Result:", error);

    // Return detailed error message
    return NextResponse.json(
      {
        message: "An error occurred while creating the result.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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

    if (result.length === 0) {
      return NextResponse.json(
        { error: "No result found for the specified quiz." },
        { status: 404 },
      );
    }

    // Construct the response
    const results = {
      result,
    };

    return NextResponse.json(results, { status: 200 });
  } catch (err) {
    console.error("Error fetching question:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing the request." },
      { status: 500 },
    );
  }
}