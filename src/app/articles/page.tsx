"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Times from "../components/Times";

export default function Artikel() {

	// const user = localStorage.getItem("user");

	// const name = JSON.parse(user || "{}").name || null;
	
	const [dataUser, setDataUser] = React.useState<{ name?: string }>({})

	React.useEffect(() => {
		const user = localStorage.getItem('user');
		setDataUser(user ? JSON.parse(user) : {});
	}, [])

	const data = [
		{
			id: 1,
			slug: 'ptm',
			title: 'PTM (Penyakit Tidak Menular)',
			image: '/images/stop-virus.png',
			content: [
				{
					id: 1,
					slug: 'anemia',
					title: 'Anemia',
					image: '/images/anemia.svg',
				},
				{
					id: 2,
					slug: 'hipertensi',
					title: 'Hipertensi',
					image: '/images/hypertension.svg',
				}
			]
		},
		{
			id: 2,
			slug: 'pb',
			title: 'Penyakit Beresiko',
			image: '/images/virus.png',
			content: [
				{
					id: 1,
					slug: 'seks-bebas',
					title: 'Seks Bebas',
					image: '/images/sex.svg'
				},
				{
					id: 2,
					slug: 'rokok',
					title: 'Rokok',
					image: '/images/smoking.svg'
				},
				{
					id: 3,
					slug: 'narkoba',
					title: 'Narkoba',
					image: '/images/medicine.svg'
				},
			]
		}
	]

	return (
		<div className="w-full flex flex-col gap-3 min-h-screen justify-between">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10 flex-row flex justify-between items-center">
					<div className="">
						<h1 className="font-bold text-4xl text-white">
							Hi, {dataUser.name?.split(" ")[0]}!
						</h1>
						<p className="text-md text-white">Good <Times /></p>
					</div>
					<Image
						src="https://stikes.wdh.ac.id/wp-content/uploads/2023/12/cropped-cropped-cropped-LOGO_STIKes-PNG-e1702550833657.png"
						alt="Donor Darah"
						width={120}
						height={120}
						quality={100}
						className="w-20 h-20 object-contain"
					/>
				</div>
			</div>

			<h1 className="font-bold text-center text-3xl underline mt-10">
				Halaman Artikel
			</h1>

			{data.map((item) => (
				<div
					className="flex flex-col gap-6 mx-10 my-16 rounded-xl"
					key={item.id}>
					<div className="flex flex-col gap-4">
						<Link
							href={{
								pathname: `/articles/${item.slug}`,
								query: { slug: item.slug },
							}}
							className="flex justify-between px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
							<div className="py-4 h-full flex justify-between">
								<div className="flex flex-col gap-2 justify-between">
									<p className="text-2xl font-bold">{item.title}</p>
									<p className="text-md"></p>
								</div>
							</div>
							<Image
								src={item.image}
								alt={item.title}
								width={200}
								height={200}
								quality={100}
								priority={true}
								className="w-1/3 object-contain"
							/>
						</Link>
						{item.content.map((content) => (
							<Link
								key={content.id}
								href={{
									pathname: `/articles/${content.slug}`,
									query: { slug: content.slug },
								}}
								className="flex justify-between ml-20 mx-4 p-8 rounded-xl h-40 bg-sky-100 hover:text-white hover:bg-blue-500">
								<div className="py-4 h-full flex justify-between">
									<div className="flex flex-col gap-2 justify-between">
										<p className="text-2xl font-bold">{content.title}</p>
										<p className="text-md"></p>
									</div>
								</div>
								<Image
									src={content.image}
									alt={item.title}
									width={200}
									height={200}
									quality={100}
									className="w-1/3 object-contain"
								/>
							</Link>
						))}
					</div>
				</div>
			))}
			<div className="flex justify-center font-bold mb-24">
				Made with ❤️ in a Quiet Place
			</div>
		</div>
	);
}
