"use client";

import * as React from "react";
// import Image from "next/image";
// import Link from "next/link";

export default function Period() {
	const name = "KUCING";

	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">Hi, {name}!</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>

			<h1 className="font-bold text-center text-2xl underline mt-10">
				Kalender Menstruasi
			</h1>
      <div className="flex flex-col mx-10 my-8 rounded-xl">
        <p>test</p>
			</div>
		</div>
	);
}
