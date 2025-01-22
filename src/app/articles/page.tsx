"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
 
export default function Artikel() {
	const router = useRouter();

	const [dataUser, setDataUser] = React.useState<{ name?: string, pre_test?: boolean, post_test?: boolean }>({})
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		const user = localStorage.getItem('user');
		// setDataUser(user ? JSON.parse(user) : {});
		const id = user ? JSON.parse(user).id : null;
		
		console.log(id, 'id')
		const fetchUserData = async () => {
			const token = localStorage.getItem("token");

			// Jika token tidak ditemukan, arahkan ke halaman login
			if (!token) {
				router.push("/");
				return;
			}

			try {
				// Lakukan permintaan GET dengan header Authorization
				const response = await axios.get(`/api/users/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(response.data, 'data')

				setDataUser(response.data);
				setIsLoading(false);
				// console.log(response.data, "data User");
			} catch (error) {
				// Jika token tidak valid atau kedaluwarsa, hapus token dan arahkan ke halaman login

				if (axios.isAxiosError(error) && error.response?.status === 401) {
					localStorage.removeItem("token");
					router.push("/");
				}
			}
		};

		// Pastikan ID ada sebelum memulai permintaan
		if (id) {
			fetchUserData();
		}
	}, [router])

	const data = [
		{
			id: 1,
			slug: 'ptm',
			title: 'PTM (Penyakit Tidak Menular)',
			image: '/images/stop-virus.png',
		},
		{
			id: 2,
			slug: 'pb',
			title: 'Perilaku Beresiko',
			image: '/images/icon-pb.jpeg'
		}
	]

	return (		
		<div className="w-full mb-28 md:mb-2">
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
				href="/dashboard"
				className="mx-4 md:mx-10 text-md underline hover:text-slate-500">
				Kembali Dashboard
			</Link>

			{isLoading ? (
						<div className="text-center">Loading...</div>
			) : (
				<>
						{dataUser?.pre_test === false ? (
							<div className="flex justify-center items-center">
								<h1 className="font-bold text-center text-2xl md:text-3xl underline my-8">
									Silahkan Kerjakan Quiz terlebih dahulu!
								</h1>
							</div>
					): (
						<>
							<h1 className="font-bold text-center text-2xl md:text-3xl underline my-8">
								Halaman Artikel
							</h1>
								{data.map((item) => (
										<div className="flex flex-col mx-4 md:mx-10 mt-4 md:mt-8 rounded-xl" key={item.id}>
											<div className="flex flex-col gap-4">
												<Link
													href={`/articles/${item.slug}`}
													className="flex justify-between px-6 md:px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
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
						</>
					)}
					</>
			)}
		</div>
	);
}
