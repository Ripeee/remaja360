import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const { quizId, question, options } = await req.json();

		// Validate input
		if (
			!quizId ||
			!question ||
			!options ||
			!Array.isArray(options) ||
			options.length === 0
		) {
			return NextResponse.json(
				{
					message:
						"Invalid input. Ensure quizId, question, and options are provided.",
				},
				{ status: 400 },
			);
		}

		// Validate quiz existence
		const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
		if (!quiz) {
			return NextResponse.json({ message: "Quiz not found." }, { status: 404 });
		}

		// Create question and options in a transaction
		const result = await prisma.$transaction(async (prisma) => {
			// Create question
			const newQuestion = await prisma.question.create({
				data: {
					quizId,
					question,
				},
			});

			// Create options related to the question
			const newOptions = await prisma.option.createMany({
				data: options.map((opt: { option: string; isCorrect: boolean }) => ({
					questionId: newQuestion.id,
					option: opt.option,
					isCorrect: opt.isCorrect,
				})),
			});

			return { newQuestion, newOptions };
		});

		return NextResponse.json(
			{
				message: "Question and options created successfully.",
				question: result.newQuestion,
				options: result.newOptions,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating question and options:", error);

		// Return a clear error message
		return NextResponse.json(
			{
				message: "An error occurred while creating the question and options."
			},
			{ status: 500 },
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

		// Parse query parameters
		const { searchParams } = new URL(req.url);
		const quizId = searchParams.get("id");

		if (!quizId || isNaN(Number(quizId))) {
			return NextResponse.json(
				{ error: "Valid Quiz ID is required." },
				{ status: 400 },
			);
		}

		// Fetch quiz category
		const category = await prisma.quiz.findUnique({
			where: { id: parseInt(quizId) },
		});

		if (!category) {
			return NextResponse.json(
				{ error: "Quiz category not found." },
				{ status: 404 },
			);
		}

		// Fetch questions and their options
		const questions = await prisma.question.findMany({
			where: { quizId: parseInt(quizId) },
			include: { options: true },
		});

		if (questions.length === 0) {
			return NextResponse.json(
				{ error: "No questions found for the specified quiz." },
				{ status: 404 },
			);
		}

		// Get total questions count
		const totalQuestion = await prisma.question.count({
			where: { quizId: parseInt(quizId) },
		});

		// Construct the response
		const result = {
			category,
			questions,
			totalQuestion,
		};

		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		console.error("Error fetching question:", err);
		return NextResponse.json(
			{ error: "An unexpected error occurred while processing the request." },
			{ status: 500 },
		);
	}
}