"use client";

import * as React from "react";
// import Image from "next/image";
import Link from "next/link";

export default function Artikel() {

	const [name, setName] = React.useState("Kucing");

	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">Hi, {name}!</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>

				<h1>Halaman Artikel</h1>
			<div className="mx-8 my-8 flex flex-col gap-6 items-center">
				<h1>Artikel Terpopuler</h1>

				<div className="grid grid-cols-2 justify-around w-full h-full gap-6">
					<Link href='/artikel' className="bg-black rounded-xl h-40 w-full"></Link>
					<Link href='/artikel' className="bg-black rounded-xl h-40 w-full"></Link>
					<Link href='/artikel' className="bg-black rounded-xl h-40 w-full"></Link>
					<Link href='/artikel' className="bg-black rounded-xl h-40 w-full"></Link>
				</div>

				<div className="flex justify-center font-bold">
					Made with ❤️ in a Quiet Place
				</div>
			</div>
		</div>
	);
}