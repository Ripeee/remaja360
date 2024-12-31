import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get("id");

    
    if (!quizId) {
			return NextResponse.json(
				{ message: "Quiz ID is required." },
				{ status: 400 },
			);
		}

		// Fetch the quiz category
		const category = await prisma.quiz.findUnique({
			where: { id: parseInt(quizId) },
		});

		if (!category) {
			return NextResponse.json(
				{ message: "Quiz category not found." },
				{ status: 404 },
			);
		}

		// Fetch the question by its ID and include options
		const questions = await prisma.question.findMany({
			where: { quizId: parseInt(quizId) },
			include: { options: true },
		});

		const totalQuestion = await prisma.question.count({
			where: { quizId: parseInt(quizId) }
		});

		// Check if question exists
		if (!questions) {
			return NextResponse.json(
				{ message: "Question not found." },
				{ status: 404 },
			);
		}

    const result = {
      category,
			questions,
			totalQuestion
    };

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
		console.error("Error fetching question:", err);
		return NextResponse.json(
			{ message: "An error occurred while fetching the question." },
			{ status: 500 },
		);
	}
}