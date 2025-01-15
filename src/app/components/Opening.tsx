"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Opening() {
	// const name = "KUCING";

	// const category = [
	// 	{
	// 		id: 1,
	// 		name: "Stay Fit, Stay Fun!",
	// 		image: "/images/smoking.svg",
	// 	},
	// 	{
	// 		id: 2,
	// 		name: "Menuju Hidup Sehat!",
	// 		image: "/images/medicine.svg",
	// 	},
	// 	{
	// 		id: 3,
	// 		name: "Sehat Bareng, Yuk!",
	// 		image: "/images/sex.svg",
	// 	},
	// ];

	return (
		<div className="w-full flex flex-col gap-3">
			{/* <div className=""> */}
			<Image
				src="/images/gradient-opening.svg"
				alt="Gradient"
				width={200}
        height={200}
        priority={true}
				className="w-full mt-[-240px] md:mt-[-300px]"
			/>
			<Image
				src="/images/page-3.svg"
				alt="Page"
				width={500}
        height={500}
        priority={true}
				className="md:mx-auto mx-10 mt-[-100px] md:mt-[-200px] w-auto h-auto"
			/>
			{/* </div> */}
			{/* <div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">Hi, {name}!</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div> */}

				<h1 className="font-bold text-2xl md:text-4xl text-center mt-4">Sehat Bareng, Yuk!</h1>
			<div className="flex justify-center mx-auto my-8">
				<Link
					href="/login"
					className="bg-blue-700 rounded-full px-8 md:px-16 hover:bg-blue-400 disabled:bg-blue-50">
					<p className="text-white text-center font-bold text-2xl py-4 px-8">
						Mulai Sekarang
					</p>
				</Link>
			</div>
		</div>
	);
}
