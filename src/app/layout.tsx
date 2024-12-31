"use client"

import { Istok_Web, Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import SplashScreen from "./components/SplashScreen";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

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
			// Redirect to /dashboard if token is found
			router.push("/dashboard");
		} else {
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
					{!(pathname === "/" ) &&
						pathname !== "/login" &&
						pathname !== "/signup" && <Navbar />}{" "}
				</div>
			</body>
		</html>
	);
}
