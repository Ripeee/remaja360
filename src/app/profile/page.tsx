"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import axios from "axios";

export default function Signup() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  
	const dateFormat = dayjs("2019-01-25").format("DD/MM/YYYY");
  
	const data = ({
		full_name: 'Kucing',
		gender: '1',
		date_of_birth: dateFormat,
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

	React.useEffect(() => {
		axios.get("/api/users", {
				id: 1,
		}).then((res) => {
			console.log(res.data)
		})
	}, [])

	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px] mb-12">
				<h1 className="font-bold text-3xl text-center text-white">
					Hi, {data.full_name}!
				</h1>
			</div>

			<div className="mx-8 mb-24 flex flex-col gap-6">
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
					<div className="flex justify-between items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<p className="text-md">{showPassword ? data.password : maskedPassword}</p>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" top-2 right-2">
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-gray-500"
              />
            </button>
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
