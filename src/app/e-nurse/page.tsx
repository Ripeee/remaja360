"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
 
export default function Nurse() {
	const [dataUser, setDataUser] = React.useState<{ name?: string }>({})

	React.useEffect(() => {
		const user = localStorage.getItem("user");
		setDataUser(user ? JSON.parse(user) : {});
			
	}, [])
	return (
		<div className="w-full flex flex-col mb-20 md:mb-2">
			<div className="">
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
							alt="Donor Darah"
							width={120}
							height={120}
							quality={100}
							className="w-20 h-20 object-contain"
						/>
					</div>
				</div>

				<h1 className="font-bold text-center text-3xl underline mt-10">
					E-Nurse
				</h1>
				
				<div className="flex flex-col gap-6 mx-4 md:mx-10 my-8 md:my-16 rounded-xl">
					<Link
						href="/e-nurse/period"
						className="flex justify-between px-4 md:px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
						<div className="py-4 h-full flex justify-between">
							<div className="flex flex-col gap-2 justify-between">
								<p className="text-2xl font-bold">Kalender Menstruasi</p>
								<p className="text-md">
									Cek Siklus Menstruasimu, <br /> Disini!
								</p>
							</div>
						</div>
						<Image
							src="/images/calendar.svg"
							alt="Donor Darah"
							width={200}
							height={200}
							quality={100}
							className="w-1/3 object-contain"
						/>
					</Link>
					<Link
						href="/e-nurse/quiz"
						className="flex justify-between px-4 md:px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
						<div className="py-4 h-full flex justify-between">
							<div className="flex flex-col gap-2 justify-center">
								<p className="text-2xl font-bold">Quiz</p>
								<p className="text-md">Quiz dulu, yuk!</p>
							</div>
						</div>
						<Image
							src="/images/quiz.svg"
							alt="Quiz"
							width={200}
							height={200}
							quality={100}
							className="w-1/3 object-contain"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
