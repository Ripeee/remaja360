import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token")?.value; // Ambil token dari cookie

	// Jika tidak ada token dan mencoba akses halaman selain login atau signup
	if (!token && !["/login", "/signup"].includes(req.nextUrl.pathname)) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// Jika ada token dan mencoba akses login atau signup, arahkan ke dashboard
	if (token && ["/login", "/signup"].includes(req.nextUrl.pathname)) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	// Lanjutkan ke halaman jika valid
	return NextResponse.next();
}

// Tentukan rute yang akan menggunakan middleware
export const config = {
	matcher: ["/dashboard/:path*", "/login", "/signup"], // Gunakan pada rute ini
};
