"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
// Import Swiper React components
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useParams, useSearchParams } from "next/navigation";

export default function DonorLocation() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { slug } = params;

  const placeName = searchParams.get('name');
  const address = searchParams.get('address');

  console.log(params, 'param')
  console.log({ slug }, 'slug')

  const name = "Kucing";

	return (
		<div className="w-full flex flex-col gap-4 mb-10">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">
						Hi, {name} {slug}!
					</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>

			<div className="flex flex-col items-center mx-10 my-8 rounded-xl">
				<Image
					src="/images/pmi-tangsel.png"
					alt="Donor Darah"
					width={400}
					height={400}
					quality={100}
					className="w-1/3 object-contain"
				/>
				<h1 className="font-bold text-center text-2xl underline">
					{placeName}
				</h1>
				<p className="text-lg text-center font-medium italic">
					{address}
				</p>
				<p className="text-lg text-center font-bold">
					Ayo, bergabung dalam aksi donor darah!
				</p>
			</div>

			<div className="flex justify-center font-bold my-4">
				Made with ❤️ in a Quiet Place
			</div>
		</div>
	);
}