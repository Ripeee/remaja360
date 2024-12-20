import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faNewspaper, faUser, faUserNurse } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

export default function Navbar() {
	const pathname = usePathname(); // Mendapatkan path saat ini

	return (
		<div className="fixed bottom-0 h-20 w-full bg-blue-400 flex justify-around items-center max-w-screen-sm rounded-t-2xl">
			<Link
				href="/dashboard"
				className={[
					pathname === "/dashboard" ? "text-white" : "text-slate-700",
					" gap-1.5 flex flex-col items-center",
				].join("")}>
				<FontAwesomeIcon icon={faHouse}  className="h-5"/>
				<p className="">Home</p>
			</Link>
			<Link
				href="/artikel"
				className={[
					pathname === "/article" ? "text-white" : "text-slate-700",
					" gap-1.5 flex flex-col items-center",
				].join("")}>
				<FontAwesomeIcon icon={faNewspaper}  className="h-5"/>
				<p className="">Artikel</p>
			</Link>
			<Link
				href="/quiz"
				className={[
					pathname === "/quiz" ? "text-white" : "text-slate-700",
					" gap-1.5 flex flex-col items-center",
				].join("")}>
				<FontAwesomeIcon icon={faUserNurse}  className="h-5"/>
				<p className="">E-Nurse</p>
			</Link>
			<Link
				href="/profile"
				className={[
					pathname === "/profile" ? "text-white" : "text-slate-700",
					" gap-1.5 flex flex-col items-center",
				].join("")}>
				<FontAwesomeIcon icon={faUser}  className="h-5"/>
				<p className="">Profile</p>
			</Link>
		</div>
	);
}
