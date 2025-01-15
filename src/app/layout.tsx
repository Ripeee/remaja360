"use client";

import { Istok_Web, Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import SplashScreen from "./components/SplashScreen";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import { decodeJwt } from "jose";

const istokWeb = Istok_Web({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-istok-web", // Optional: Custom CSS variable
});

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-inter", // Optional: Custom CSS variable
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();

	const [showSplash, setShowSplash] = React.useState(true);
	const pathname = usePathname(); // Ambil path saat

	React.useEffect(() => {
		const token = localStorage.getItem("token");


		if (token) {
			// Jika token ada, arahkan ke dashboard
				const payload = decodeJwt(token);
				const isExpired = payload.exp && Date.now() >= payload.exp * 1000;

				if (isExpired) {
					alert("Session expired. Please log in again.");
					localStorage.removeItem("token");
					localStorage.removeItem("user");
					window.location.href = "/login";
				} else {
					if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
						router.push("/dashboard"); // Jika login/signup, redirect ke dashboard
					}
				}
		} else {
			if (
				(pathname !== "/" &&
					pathname !== "/login" &&
					pathname !== "/signup" &&
					pathname !== "/admin" &&
					pathname !== "/admin/quiz")
			) {
				// Hapus token dan data user jika ada
				localStorage.removeItem("token");
				localStorage.removeItem("user");

				// Redirect ke login
				router.push("/login");
			}

			if (pathname === "/") {
				// Show splash screen only on the home page
				const timer = setTimeout(() => {
					setShowSplash(false);
				}, 2000); // Splash screen for 2 seconds
				return () => clearTimeout(timer);
			} else {
				// Hide splash screen if not on the home page
				setShowSplash(false);
			}
		}
	}, [pathname, router]);

	return (
		<html lang="en">
			<body
				className={`${istokWeb.variable} ${inter.variable} antialiased md:bg-blue-300`}>
				<div className="flex justify-center mx-auto bg-white min-h-screen max-w-screen-sm">
					{pathname === "/" && showSplash ? <SplashScreen /> : children}
					{!(
						pathname === "/" ||
						pathname === "/login" ||
						pathname === "/signup" ||
						pathname === "/admin" ||
						pathname === "/admin/quiz"
					) && <Navbar />}
				</div>
			</body>
		</html>
	);
}
