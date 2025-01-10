"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/app/components/ArticleCard";
// Import Swiper React components
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Times from "../components/Times";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Dashboard() {
  
  const images = [
		"/images/background.jpeg",
	];
  // const images = [
	// 	"https://images.unsplash.com/photo-1731331344306-ad4f902691a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
	// 	"https://images.unsplash.com/photo-1731429945593-61610daebc11?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
	// ];
    
	const article = [
		{
			id: 1,
			image: "https://images.unsplash.com/photo-1636759805271-6299d2666773?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZGFjaGV8ZW58MHx8MHx8fDA%3D",
			title: "Rokok",
			slug: "rokok",
		},
		{
			id: 2,
			image: "https://images.unsplash.com/photo-1634906344426-2ba0e7c91b09?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGhlYWRhY2hlfGVufDB8fDB8fHww",
			title: "Seks Bebas",
			slug: "seks-bebas",
		},
	];


	const [name, setName] = React.useState("");

	
	React.useEffect(() => {
		// This runs only on the client side
		const user = localStorage.getItem("user");
		const userData = JSON.parse(user || "{}");
		setName(userData.name || "User");
	}, []);

	return (
		<div className="w-full flex flex-col gap-4 mb-10">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10 flex-row flex justify-between items-center">
					<div className="">
						<h1 className="font-bold text-4xl text-white">
							Hi, {name.split(" ")[0]}!
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

			{/* Swiper Section */}
			<div className="swiper-container mx-10 h-80 rounded-xl mt-[-30px]">
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={30}
					slidesPerView={1}
					navigation
					pagination={{ clickable: true }}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					className="rounded-2xl">
					{images.map((src, index) => (
						<SwiperSlide key={index}>
							<Image
								src={src}
								alt={`Slide ${index + 1}`}
								width={800}
								height={600}
								priority={true}
								className="w-full h-auto object-contain rounded-2xl"
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Donor Info Section */}
			{/* <Link
				href="/donor"
				className="flex justify-between items-center mt-10 rounded-xl h-40 bg-blue-200 mx-10 hover:text-white hover:bg-slate-300">
				<Image
					src="/images/donor.svg"
					alt="Donor Darah"
					width={120}
					height={120}
					quality={100}
					className="w-1/3 object-contain"
				/>
				<div className="rounded-r-xl w-1/2 px-2 py-1 h-full flex items-center">
					<p className="text-2xl font-bold">Informasi Donor Darah</p>
				</div>
			</Link> */}

			{/* Popular Articles Section */}
			<div className="mx-8 my-8 flex flex-col gap-6 items-center">
				<h1 className="font-bold text-2xl">Artikel Terpopuler</h1>
				<div className="grid grid-cols-2 gap-6">
					{article.map((article) => (
						<Link
							href={{
								pathname: `/articles/${article.slug}`,
								query: { slug: article.slug },
							}}
							key={article.id}
							className="rounded-xl bg-black flex flex-col h-60">
							<ArticleCard imageUrl={article.image} title={article.title} />
						</Link>
					))}
				</div>
				<div className="flex justify-center font-bold my-4">
					Made with ❤️ in a Quiet Place
				</div>
			</div>
		</div>
	);
}
