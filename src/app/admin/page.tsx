"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Times from "../components/Times";
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
    
    if (userData.id == 1) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
    
    // console.log(user, 'ser')
		setName(userData.name || "User");
	}, []);

	return (
		<div className="w-full flex flex-col justify-between gap-4">
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
							<div className="flex flex-col gap-6 mx-10 mt-8 mb-24 rounded-xl">
									<Link
										href="/admin/quiz"
										className="flex justify-between px-10 rounded-xl h-40 bg-sky-100 hover:text-white hover:bg-blue-500">
										<div className="py-4 h-full flex items-center">
												<p className="text-2xl font-bold">Lihat Hasil Test Quiz</p>
										</div>
										<Image
											src="/images/quiz.svg"
											alt="Tes Quiz"
											width={200}
											height={200}
											quality={100}
											className="w-1/3 object-contain my-6"
										/>
									</Link>
							</div>
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
