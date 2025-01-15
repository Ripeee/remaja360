"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function DonorLocation() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { slug } = params;

  const placeName = searchParams.get('name');
  const address = searchParams.get('address');
  const phone = searchParams.get('phone');

  const name = "Kucing";

	return (
		<div className="w-full flex flex-col gap-4 md:mb-10">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">
						Hi, {name} {slug}!
					</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>
			
      <Link href="/donor" className=" mx-10 text-md underline hover:text-slate-500">Kembali Lokasi Donor Darah</Link>

			<div className="flex flex-col items-center mx-24 rounded-xl gap-1">
				<Image
					src="/images/pmi-tangsel.png"
					alt="Donor Darah"
					width={400}
					height={400}
					quality={100}
					priority
					className="w-full object-contain"
				/>
				<h1 className="font-bold text-center text-2xl mt-4">
					{placeName}
				</h1>
				<p className="text-lg text-center font-medium italic">{address}</p>
				<p className="text-lg text-center font-medium italic">{phone}</p>

				<div className="mt-10">
					<h3 className="mb-4 font-bold text-xl">Jadwal Donor Darah</h3>

					<div className="grid grid-cols-2 text-md gap-2">
						<p className="font-semibold">Senin</p>
						<p>08:00 - 14:00</p>
						<p className="font-semibold">Selasa</p>
						<p>08:00 - 14:00</p>
						<p className="font-semibold">Rabu</p>
						<p>08:00 - 14:00</p>
						<p className="font-semibold">Kamis</p>
						<p>08:00 - 14:00</p>
						<p className="font-semibold">Jumat</p>
						<p>08:00 - 14:00</p>
						<p className="font-semibold">Sabtu</p>
						<p>08:00 - 14:00</p>
						<p className="font-semibold">Minggu</p>
						<p>08:00 - 14:00</p>
					</div>
				</div>
			</div>
		</div>
	);
}