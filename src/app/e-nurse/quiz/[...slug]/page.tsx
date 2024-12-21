"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CategoryQuiz() {

    const searchParams = useSearchParams();
  
    const category = searchParams.get('category');
  
  const name = "KUCING";

  return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">Hi, {name}!</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
      </div>
      
			<Link
				href="/e-nurse/quiz"
				className=" mx-10 text-md underline hover:text-slate-500">
				Kembali Quiz
			</Link>

			<h1 className="font-bold text-center text-2xl underline mt-10">
				<p>{category}</p>
			</h1>
			<div className="flex flex-col mx-10 my-8 rounded-xl">
				<p>{category}</p>
			</div>
		</div>
	);
}
