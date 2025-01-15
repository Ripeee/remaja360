"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
 
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
			slug: 'seks-bebas',
			title: 'Seks Bebas',
			image: '/images/sex.svg'
		},
		{
			id: 2,
			slug: 'rokok',
			title: 'Rokok',
			image: '/images/icon-rokok.jpeg'
		},
		{
			id: 3,
			slug: 'narkoba',
			title: 'Narkoba',
			image: '/images/icon-narkoba.jpeg'
		}
	]

	return (
		<div className="w-full md:flex flex-col gap-3 mb-28 md:mb-28">
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
				href="/articles"
				className="mx-4 md:mx-10 text-md underline hover:text-slate-500">
				Kembali Artikel
			</Link>

			<h1 className="font-bold text-center text-2xl md:text-3xl underline my-8">
				Perilaku Beresiko
			</h1>

			{data.map((item) => (
				<div
					className="flex flex-col mx-4 md:mx-10 mt-4 md:mt-4 md: rounded-xl"
					key={item.id}>
					<div className="flex flex-col gap-4">
						<Link
							href={{
								pathname: `/articles/ptm/${item.slug}`,
								query: { slug: item.slug },
							}}
							className="flex justify-between px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
							<div className="py-4 h-full flex justify-between items-center">
								<div className="flex flex-col gap-2 justify-between">
									<p className="text-xl md:text-2xl font-bold">{item.title}</p>
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
					</div>
				</div>
			))}
		</div>
	);
}
