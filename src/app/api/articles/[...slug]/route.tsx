import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();

const handleError = (message: string) => {
	return NextResponse.json({ error: message }, { status: 500 });
};

export async function GET(req: NextRequest,{ params }: { params: Promise<{ slug: string }> }) {
	try {
		// Extract the token from the Authorization header
		const token = req.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json(
				{ error: "Authorization token is required" },
				{ status: 401 },
			);
		}

		// Verify the JWT token
		const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");
		await jwtVerify(token, secret); // Verify the token
		// End Token

		// Start the Query
		const { slug } = await params; // Get the slug from the dynamic route parameter
		const { searchParams } = new URL(req.url);

		// Pagination params for content
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "100", 10); // Limit based on word count
		const offset = (page - 1) * limit;

		// Fetch article by slug
		const article = await prisma.article.findUnique({
			where: { slug: String(slug) },
		});

		if (!article) {
			return NextResponse.json(
				{ message: "Article not found" },
				{ status: 404 },
			);
		}

		// Split the content into an array of words
		const words = article.content.split(' '); // Split by space
		// const words = article.content.split(/\s+/); // Split by whitespace (spaces, newlines, etc.)

		// Paginate the words array
		const paginatedWords = words.slice(offset, offset + limit);
		const paginatedContent = paginatedWords.join(" "); // Join words back into a string

		// Calculate total number of words and total pages for pagination
		const totalWords = words.length;
		const totalPages = Math.ceil(totalWords / limit);

		return NextResponse.json(
			{
				article: {
					...article,
					content: paginatedContent,
				},
				totalWords,
				totalPages,
				currentPage: page,
			},
			{ status: 200 },
		);
	} catch (error) {
		return handleError(error + " Gagal mengambil data Artikel");
	}
}
