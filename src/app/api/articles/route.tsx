import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // For verifying JWT

// interface createDataArticle {
// 	title: string;
// 	category: string;
// 	authorId: number;
// 	content: string;
// 	image: string;
// }

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Helper function untuk menghandle error
const handleError = (message: string) => {
  return NextResponse.json({ error: message }, { status: 500 });
};

// Fungsi GET: Mengambil semua Artikel
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: "asc" },
      }),
      prisma.article.count(),
    ]);

    return NextResponse.json(
      {
        articles,
        total,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error, 'JWT Expired')
		return NextResponse.json(
			{ error: "Failed to fetch articles" },
			{ status: 500 },
		);
	}
}

// Fungsi POST: Membuat Artikel baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, title } = body;

    // Generate slug if not provided
    const slug = body.slug || title?.toLowerCase().replace(/\s+/g, '-') || '';

    const articleData = { ...body, slug };

    let result;

    if (id) {
      // Update existing article
      result = await prisma.article.update({
        where: { id },
        data: articleData,
      });
    } else {
      // Create new article
      result = await prisma.article.create({
        data: articleData,
      });
    }

    return NextResponse.json(result, { status: id ? 200 : 201 });
  } catch (error) {
    return handleError(error + ' Gagal membuat atau memperbarui Artikel');
  }
}

// Fungsi untuk membuat Artikel
// const createArticle = async (data: createDataArticle) => {
//   const {
//     title,
//     category,
//     authorId,
//     content,
//     image
//   } = data;

//   return await prisma.article.create({
//     data: {
//       title,
//       category,
//       author: {
//         connect: { id: authorId },
//       },
//       content,
//       image,
//     },
//   });
// };

// Fungsi DELETE: Menghapus Artikel
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await deleteArticle(id);

    return NextResponse.json({ message: "Artikel berhasil dihapus" }, { status: 200 });
  } catch (error) {
    return handleError(error + "Gagal menghapus Artikel");
  }
}

// Fungsi untuk menghapus Artikel berdasarkan ID
const deleteArticle = async (id: string) => {
  await prisma.article.delete({
    where: { id: Number(id) },
  });
};