"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
// Import Swiper React components
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
	const [name, setName] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false)

	React.useEffect(() => {
		// This runs only on the client side
		const user = localStorage.getItem("user");
    const userData = JSON.parse(user || "{}");
    
    if (userData.id == 0) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
    
    console.log(user, 'ser')
		setName(userData.name || "User");
	}, []);

	return (
		<div className="w-full flex flex-col justify-between gap-4">
			<div className="flex flex-col pb-10 justify-end w-full h-1/3 bg-blue-500 rounded-[40px] mt-[-60px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">
						Hi, {name.split(" ")[0]}!
					</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>

			{isAdmin ? (
				<div className="h-full">
					<div className="swiper-container mx-10 h-72 rounded-xl mt-[-50px]">
						{/* Swiper Section */}
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
										className="w-full h-auto object-cover rounded-2xl"
									/>
								</SwiperSlide>
							))}
						</Swiper>

						<div className="flex flex-col items-center gap-4 my-4">
							<h1 className="font-bold text-2xl">Test Admin</h1>

							<Link
								href="/admin/quiz"
								className="bg-green-400 rounded-xl px-8 hover:bg-green-600 disabled:bg-blue-50">
								<p className="text-white text-center font-bold text-md py-2">
									Lihat Hasil Test Quiz
								</p>
							</Link>
						</div>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center h-full mt-[-240px]">
					<h1 className="font-bold text-4xl">Halaman ini Khusus Admin!!</h1>
				</div>
			)}
			{/* Popular Articles Section */}
			<p className="flex justify-center font-bold my-4">
				Made with ❤️ in a Quiet Place
			</p>
		</div>
	);
}
