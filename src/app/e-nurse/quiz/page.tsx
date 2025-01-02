"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Quiz() {
  
  const category = [
    {
      id: 1,
      slug: "rokok",
      name: "Rokok",
      image: "/images/smoking.svg",
    },
    {
      id: 2,
      slug: "narkoba",
      name: "Narkoba",
      image: "/images/medicine.svg",
    },
    {
      id: 3,
      slug: "seks-bebas",
      name: "Seks Bebas",
      image: "/images/sex.svg",
    },
    {
      id: 4,
      slug: "anemia",
      name: "Anemia",
      image: "/images/anemia.svg",
    },
    {
      id: 5,
      slug: "hipertensi",
      name: "Hipertensi",
      image: "/images/hypertension.svg",
    },
  ]
  const [dataUser, setDataUser] = React.useState<{ name?: string }>({})

  React.useEffect(() => {
    const user = localStorage.getItem("user");
		setDataUser(user ? JSON.parse(user) : {});
			
  }, [])
	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">Hi, {dataUser.name}!</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>

			<h1 className="font-bold text-center text-2xl underline mt-10">
				Kategori Quiz
			</h1>
      <div className="flex flex-col gap-6 mx-10 mt-8 mb-24 rounded-xl">
        {category.map((cat) => (
          <Link
            key={cat.id}
            href={{
              pathname: `/e-nurse/quiz/${cat.slug}`,
              query: { id: cat.id },
            }}
            className="flex justify-between px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
            <div className="py-4 h-full flex justify-between">
              <div className="flex flex-col gap-2 justify-around">
                <p className="text-xl">Quiz</p>
                <p className="text-3xl font-bold">{cat.name}</p>
              </div>
            </div>
            <Image
              src={cat.image}
              alt={cat.name}
              width={200}
              height={200}
              quality={100}
              className="w-1/3 object-contain my-6"
            />
          </Link>
        ))}
			</div>
		</div>
	);
}
