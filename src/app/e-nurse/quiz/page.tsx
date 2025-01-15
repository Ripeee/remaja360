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
	];
	const [dataUser, setDataUser] = React.useState<{ name?: string }>({});

	React.useEffect(() => {
		const user = localStorage.getItem("user");
		setDataUser(user ? JSON.parse(user) : {});
	}, []);

	// Reorder array
	const desiredOrder = [
		"Anemia",
		"Hipertensi",
		"Seks Bebas",
		"Rokok",
		"Narkoba",
	];

	const reorderedCategory = desiredOrder.map((name) =>
		category.find((item) => item.name === name),
	);

	return (
		// <div className="w-full flex flex-col gap-3">
		// 	<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
		// 		<div className="mx-10 flex-row flex justify-between items-center">
		// 			<div className="">
		// 				<h1 className="font-bold text-4xl text-white">
		// 					Hi, {dataUser.name?.split(" ")[0]}!
		// 				</h1>
		// 				<p className="text-md text-white">Ayo jadi remaja cerdas !!</p>
		// 			</div>
		// 			<Image
		// 				src="https://stikes.wdh.ac.id/wp-content/uploads/2023/12/cropped-cropped-cropped-LOGO_STIKes-PNG-e1702550833657.png"
		// 				alt="Logo Stikes"
		// 				width={120}
		// 				height={120}
		// 				quality={100}
		// 				className="w-20 h-20 object-contain"
		// 			/>
		// 		</div>
		// 	</div>

		// 	<Link
		// 		href="/e-nurse"
		// 		className=" mx-10 text-md underline hover:text-slate-500">
		// 		Kembali E-Nurse
		// 	</Link>

		// 	<h1 className="font-bold text-center text-2xl underline">
		// 		Kategori Quiz
		// 	</h1>
		// 	<div className="flex flex-col gap-6 mx-10 mt-8 mb-24 rounded-xl">
		// 		{reorderedCategory.map(
		// 			(item) =>
		// 				item && (
		// 					<Link
		// 						key={item.id}
		// 						href={{
		// 							pathname: `/e-nurse/quiz/${item.slug}`,
		// 							query: { id: item.id },
		// 						}}
		// 						className="flex justify-between px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
		// 						<div className="py-4 h-full flex justify-between">
		// 							<div className="flex flex-col gap-2 justify-around">
		// 								<p className="text-xl">Quiz</p>
		// 								<p className="text-3xl font-bold">{item.name}</p>
		// 							</div>
		// 						</div>
		// 						<Image
		// 							src={item.image}
		// 							alt={item.name}
		// 							width={200}
		// 							height={200}
		// 							quality={100}
		// 							className="w-1/3 object-contain my-6"
		// 						/>
		// 					</Link>
		// 				),
		// 		)}
		// 	</div>
		// </div>

		<div className="w-full mb-10 md:mb-2">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px] mb-4">
				<div className="mx-4 md:mx-10 flex-row flex justify-between items-center">
					<div className="">
						<h1 className="font-bold text-2xl md:text-4xl text-white">
							Hi, {dataUser.name?.split(" ")[0]}!
						</h1>
						<p className="text-md text-white">Ayo jadi remaja cerdas !!</p>
					</div>
					<Image
						src="https://stikes.wdh.ac.id/wp-content/uploads/2023/12/cropped-cropped-cropped-LOGO_STIKes-PNG-e1702550833657.png"
						alt="Logo Stikes"
						width={120}
						height={120}
						quality={100}
						className="w-20 h-20 object-contain"
					/>
				</div>
			</div>

			<Link
				href="/e-nurse"
				className="mx-4 md:mx-10 text-md underline hover:text-slate-500">
				Kembali E-Nurse
			</Link>

			<h1 className="font-bold text-center text-2xl md:text-3xl underline my-8">
				Kategori Quiz
			</h1>

			<div className="flex flex-col gap-6 mx-4 md:mx-10 mt-8 mb-24 rounded-xl">
				{reorderedCategory.map(
					(item) =>
						item && (
							<Link
								key={item.id}
								href={{
									pathname: `/e-nurse/quiz/${item.slug}`,
									query: { id: item.id },
								}}
								className="flex justify-between px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
								<div className="py-4 h-full flex justify-between">
									<div className="flex flex-col gap-2 justify-around">
										<p className="text-xl">Quiz</p>
										<p className="text-3xl font-bold">{item.name}</p>
									</div>
								</div>
								<Image
									src={item.image}
									alt={item.name}
									width={200}
									height={200}
									quality={100}
									className="w-1/3 object-contain my-6"
								/>
							</Link>
						),
				)}
			</div>
		</div>
	);
}
