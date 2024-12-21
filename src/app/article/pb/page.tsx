"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function PenyakitBeresiko() {
  const name = "Kucing";
  
  const data = [
    {
      title: "Seks Bebas",
      image: '/images/sex.svg',
    },
    {
      title: "Rokok",
      image: '/images/smoking.svg',
    },
    {
      title: "Narkoba",
      image: '/images/medicine.svg',
    },
  ]

	return (
		<div className="w-full flex flex-col gap-3 h-screen justify-between">
			<div className="">
				<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
					<div className="mx-10">
						<h1 className="font-bold text-4xl text-white">Hi, {name}!</h1>
						<p className="text-md text-white">Good Morning</p>
					</div>
				</div>

				<h1 className="font-bold text-center text-3xl underline mt-10">
					Penyakit Beresiko
				</h1>

        <div className="flex flex-col gap-6 mx-10 my-16 rounded-xl">
          {data.map((item, index) => (
            <Link
              key={index}
              href={`/article/ptm/${item.title.toLowerCase().replace(' ', '-')}`}
              className="flex justify-between px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
              <div className="py-4 h-full flex justify-between">
                <div className="flex flex-col gap-2 justify-between">
                  <p className="text-2xl font-bold">
                    {item.title}
                  </p>
                  <p className="text-md"></p>
                </div>
              </div>
              <Image
                src={item.image}
                alt={`Penyakit Beresiko ${index}`}
                width={200}
                height={200}
                quality={100}
                className="w-1/3 object-contain"
              />
            </Link>
          ))}
				</div>
			</div>
			<div className="flex justify-center font-bold mb-24">
				Made with ❤️ in a Quiet Place
			</div>
		</div>
	);
}
