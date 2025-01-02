"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import axios from "axios";

export default function Signup() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [maskedPassword, setMaskedPassword] = React.useState<string>("");
	interface UserData {
		name: string;
		gender: string;
		date_birth: string;
		place_birth: string;
		address: string;
		school_origin: string;
		major_class: string;
		grade: string;
		email: string;
		phone_number: string;
		password: string;
	}

	const [data, setData] = React.useState<UserData | null>(null);
  const [name, setName] = React.useState("");
	
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	
	function Logout() {
		console.log('logout')
		localStorage.removeItem("token");
		
		// Optionally, you can store the user data as well
		localStorage.removeItem("user");
		
    router.push('/')
	}
	
	React.useEffect(() => {

		const user = localStorage.getItem("user");
		const userData = JSON.parse(user || "{}");
		setName(userData.name || "User");
		const id = userData.id || null;

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
				
				setData(response.data);
				setMaskedPassword('*'.repeat(response.data.password.length));
				setIsLoading(false)
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
	}, [router]);


	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px] mb-12">
				<h1 className="font-bold text-3xl text-center text-white">
					Hi, {name}!
				</h1>
			</div>

			{isLoading ? (
				<>
					<p className="text-center">Loading...</p>
					{/* <button
						onClick={() => router.push("/")}
						className="bg-blue-400 rounded-xl px-8 hover:bg-blue-600 disabled:bg-blue-50 mx-20">
						<p className="text-white text-center font-bold text-md py-2">
							Kembali Ke Login
						</p>
					</button> */}
				</>
			) : (
				<div className="mx-8 mb-24 flex flex-col gap-6">
					<div className="items-start">
						<p className="font-bold text-xl">Nama Lengkap</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">{data?.name}</p>
						</div>
					</div>
					<div className="items-start">
						<p className="font-bold text-xl">Jenis Kelamin</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">
								{data?.gender === "1" ? "Laki-laki" : "Perempuan"}
							</p>
						</div>
					</div>
					<div className="items-start">
						<p className="font-bold text-xl">Tempat Lahir</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">{data?.place_birth}</p>
						</div>
					</div>
					<div className="items-start">
						<p className="font-bold text-xl">Tanggal Lahir</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">
								{dayjs(data?.date_birth).format("DD/MM/YYYY")}
							</p>
						</div>
					</div>
					<div className="items-start">
						<p className="font-bold text-xl">Alamat</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">{data?.address}</p>
						</div>
					</div>
					<div className="items-start">
						<p className="font-bold text-xl">Asal Sekolah</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">{data?.school_origin}</p>
						</div>
					</div>
					<div className="items-start">
						<p className="font-bold text-xl">Jurusan</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">{data?.major_class}</p>
						</div>
					</div>
					<div className="items-start">
						<p className="font-bold text-xl">Kelas</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">{data?.grade}</p>
						</div>
					</div>
					<div className="items-start">
						<p className="font-bold text-xl">Email</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">{data?.email}</p>
						</div>
					</div>
					<div className="items-start">
						<p className="font-bold text-xl">Phone</p>
						<div className="flex items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">{data?.phone_number}</p>
						</div>
					</div>

					<div className="items-start">
						<p className="font-bold text-xl">Password</p>
						<div className="flex justify-between items-center px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
							<p className="text-md">
								{showPassword ? data?.password : maskedPassword}
							</p>
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
			)}
		</div>
	);
}
