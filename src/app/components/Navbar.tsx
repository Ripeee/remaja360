import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export default function Navbar() {
	const pathname = usePathname(); // Mendapatkan path saat ini

	return (
		<div className="fixed bottom-0 h-20 w-full bg-blue-400 flex justify-around items-center max-w-screen-sm rounded-t-2xl">
			<Link
				href="/dashboard"
				className={
					pathname === "/dashboard" ? "text-white" : "text-slate-700"
				}>
				Home
			</Link>
			<Link
				href="/artikel"
				className={
					pathname === "/artikel" ? "text-white" : "text-slate-700"
				}>
				Artikel
			</Link>
			<Link
				href="/quiz"
				className={pathname === "/quiz" ? "text-white" : "text-slate-700"}>
				Quiz
			</Link>
			<Link
				href="/profile"
				className={
					pathname === "/profile" ? "text-white" : "text-slate-700"
				}>
				Profile
			</Link>
		</div>
	);
}
