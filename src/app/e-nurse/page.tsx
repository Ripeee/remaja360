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
		<div className="w-full flex flex-col gap-3 h-screen justify-between">
			<div className="">
				<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
					<div className="mx-10">
						<h1 className="font-bold text-4xl text-white">
							Hi, {dataUser.name?.split(" ")[0]}!
						</h1>
						<p className="text-md text-white">Good Morning</p>
					</div>
				</div>

				<h1 className="font-bold text-center text-3xl underline mt-10">
					E-Nurse
				</h1>
				<div className="flex flex-col gap-6 mx-10 my-16 rounded-xl">
					<Link
						href="/e-nurse/period"
						className="flex justify-between px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
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
						className="flex justify-between px-10 rounded-xl h-40 bg-sky-100 mx-4 hover:text-white hover:bg-blue-500">
						<div className="py-4 h-full flex justify-between">
							<div className="flex flex-col gap-2 justify-between">
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
			<div className="flex justify-center font-bold mb-24">
				Made with ❤️ in a Quiet Place
			</div>
		</div>
	);
}
