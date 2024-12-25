import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface createDataArticle {
	title: string;
	category: string;
	authorId: number;
	content: string;
	image: string;
}

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Helper function untuk menghandle error
const handleError = (message: string) => {
  return NextResponse.json({ error: message }, { status: 500 });
};

// Fungsi GET: Mengambil semua Artikel
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: {
        id: "asc", // Sort by `id` in ascending order
      },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return handleError(error + "Gagal mengambil data Artikel");
  }
}

// Fungsi POST: Membuat Artikel baru
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // If it's a article update, we don't want to check the email. Only check email if it's a new article.
    const isUpdating = body.id ? true : false;

    // Menggabungkan data yang sudah diformat
    const articleData = { ...body };

    let result;

    if (isUpdating) {
      // Update existing article
      result = await prisma.article.update({
        where: { id: body.id },
        data: articleData,
      });
    } else {
      // Create new article
      result = await createArticle(articleData);
    }

    return NextResponse.json(result, { status: isUpdating ? 200 : 201 });
  } catch (error) {
    return handleError(error + "Gagal membuat atau memperbarui Artikel");
  }
}

// Fungsi untuk membuat Artikel
const createArticle = async (data: createDataArticle) => {
  const {
    title,
    category,
    authorId,
    content,
    image
  } = data;

  return await prisma.article.create({
    data: {
      title,
      category,
      author: {
        connect: { id: authorId },
      },
      content,
      image,
    },
  });
};

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