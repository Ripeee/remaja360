"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();
  
  const [data, setData] = React.useState({
		full_name: 'Kucing',
		gender: '1',
		date_of_birth: '07-12-2024',
		place_of_birth: 'Palembang',
		address: 'Jalan Kecubang',
		last_school: 'SMA N 13 Jakarta',
		major: 'MIPA',
		grade: 'XI',
		email: 'kucing20@gmail.com',
		phone_number: '081038102323',
		password: 'kucing123',
	});

  const maskedPassword = '*'.repeat(data.password.length);

	function Logout() {
    console.log('logout')
    router.push('/profile')
	}

	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px] mb-12">
				<h1 className="font-bold text-3xl text-center text-white">Hi, {data.full_name}!</h1>
			</div>

      <div className="flex justify-center">
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={400}
          height={400}
          alt="profile"
          className="w-60 h-60 rounded-full object-cover"
        />
      </div>

			<div className="mx-8 my-8 flex flex-col gap-6">
				<div className="items-start">
					<p className="font-bold text-xl">Nama Lengkap</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{data.full_name}</p>
					</div>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Jenis Kelamin</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">
							{data.gender == "1" ? "Laki-laki" : "Perempuan"}
						</p>
					</div>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Tempat Lahir</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{data.place_of_birth}</p>
					</div>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Tanggal Lahir</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{data.date_of_birth}</p>
					</div>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Alamat</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{data.address}</p>
					</div>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Asal Sekolah</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{data.last_school}</p>
					</div>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Jurusan</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{data.major}</p>
					</div>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Kelas</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{data.grade}</p>
					</div>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Email</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{data.email}</p>
					</div>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Phone</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{data.phone_number}</p>
					</div>
				</div>

				<div className="items-start">
					<p className="font-bold text-xl">Password</p>
					<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
            <p className="text-md">{data.password}</p>
            {/* <p className="text-md">{maskedPassword}</p> */}
					</div>
				</div>

				<button
					onClick={Logout}
					className="px-4 py-2 bg-blue-500 text-white text-xl font-bold rounded-full w-1/2 mx-auto">
					Log Out
				</button>

				<div className="h-0.5 w-full bg-black"></div>

				<div className="flex justify-center font-bold">
					Made with ❤️ in a Quiet Place
				</div>
			</div>
		</div>
	);
}