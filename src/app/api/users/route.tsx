import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Define the interface for the input data
interface CreateUserInput {
  name: string;
  gender: string;
  place_birth: string;
  date_birth: string; // Use string for easier input validation
  address: string;
  school_origin: string;
  major_class: string;
  grade: string;
  email: string;
  phone_number: string;
  password: string;
}

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Helper function untuk menghandle error
const handleError = (message: string) => {
  return NextResponse.json({ error: message }, { status: 500 });
};

// Fungsi GET: Mengambil semua pengguna
export async function GET() {
  try {
		const users = await prisma.user.findMany({
			orderBy: {
				id: "asc", // Sort by `id` in ascending order
			},
		});
    return NextResponse.json(users, { status: 200 });
	} catch (error) {
    return handleError(error + "Gagal mengambil data pengguna");
  }
}

// Fungsi POST: Membuat pengguna baru
export async function POST(req: Request) {
	try {
		const body = await req.json();

		// If it's a user update, we don't want to check the email. Only check email if it's a new user.
		const isUpdating = body.id ? true : false;

		// Validasi email apakah sudah ada, but only for new users (not for updates)
		if (!isUpdating) {
			const existingUser = await prisma.user.findUnique({
				where: { email: body.email },
			});

			if (existingUser) {
				return NextResponse.json(
					{ error: "Email sudah terdaftar" },
					{ status: 400 },
				);
			}
		}

		// Format date_birth hanya tanggal (YYYY-MM-DD)
		const formattedDate = new Date(body.date_birth).toISOString().split("T")[0];

		// Menggabungkan data yang sudah diformat
		const userData = { ...body, date_birth: formattedDate };

		let result;

		if (isUpdating) {
			// Update existing user
			result = await prisma.user.update({
				where: { id: body.id },
				data: userData,
			});
		} else {
			// Create new user
			result = await createUser(userData);
		}

		return NextResponse.json(result, { status: isUpdating ? 200 : 201 });
	} catch (error) {
		return handleError(error + "Gagal membuat atau memperbarui pengguna");
	}
}

// Fungsi untuk membuat pengguna
const createUser = async (data: CreateUserInput) => {
	const {
		name,
		gender,
		place_birth,
		date_birth,
		address,
		school_origin,
		major_class,
		grade,
		email,
		phone_number,
		password,
	} = data;

	const parsedDate = new Date(date_birth);
	if (isNaN(parsedDate.getTime())) {
		throw new Error("Invalid date format for date_birth");
	}

	return await prisma.user.create({
		data: {
			name,
			gender,
			place_birth,
			date_birth,
			address,
			school_origin,
			major_class,
			grade,
			email,
			phone_number,
			password,
		},
	});
};

// Fungsi DELETE: Menghapus pengguna
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    await deleteUser(id);

    return NextResponse.json({ message: "Pengguna berhasil dihapus" }, { status: 200 });
  } catch (error) {
    return handleError(error + "Gagal menghapus pengguna");
  }
}

// Fungsi untuk menghapus pengguna berdasarkan ID
const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id: Number(id) },
  });
};