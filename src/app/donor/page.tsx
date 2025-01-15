"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
// Import Swiper React components
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Dashboard() {
  // const [name, setName] = React.useState("Kucing");
  const donors = [
		{
			slug: "pmi-tangsel",
			name: "PMI Tangerang Selatan",
			address: "Jalan Pejajaran No.1",
			phone: '081923971024',
			image: "/images/rs-1.svg",
		},
		{
			slug: "pmi-jakarta",
			name: "PMI Jakarta",
			address: "Jalan Sudirman No.45",
			phone: '0819239731312',
			image: "/images/rs-2.svg",
		},
	];
  const name = 'Kucing'

	return (
		<div className="w-full flex flex-col gap-4 mb-10">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">Hi, {name}!</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>

			<div className="flex flex-col mx-10 my-8 rounded-xl">
				<h1 className="font-bold text-center text-2xl underline">
					Informasi Donor Darah
				</h1>
				<p className="text-lg text-center font-medium italic">
					Setetes darahmu bisa memberi harapan bagi mereka yang membutuhkan
				</p>
				<p className="text-lg text-center font-bold">
					Ayo, bergabung dalam aksi donor darah!
				</p>
			</div>
			<h1 className="mx-4 text-lg">
				berikut adalah tempat yang bisa kamu datangi untuk mendonorkan darahmu!
      </h1>
      
			{donors.map((donor) => (
				<Link
					key={donor.slug}
					href={{
						pathname: `/donor/${donor.slug}`,
							query: { name: donor.name, address: donor.address, phone: donor.phone },
					}}
					className="flex justify-around rounded-xl h-40 bg-blue-200 mx-4 hover:text-white hover:bg-slate-300">
					<Image
						src={donor.image}
						alt="Donor Darah"
						width={200}
						height={200}
						quality={100}
						className="w-1/3 object-contain"
					/>
					<div className="w-1/2 px-2 py-4 h-full flex flex-col justify-between">
						<div className="flex flex-col gap-2">
							<p className="text-xl font-bold">{donor.name}</p>
							<p className="text-md">{donor.address}</p>
						</div>
						<div className="">
							<p className="text-end text-md underline">lihat selengkapnya</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
