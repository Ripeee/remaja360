"use client"

import Link from 'next/link';
import * as React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Signup() {
	const router = useRouter()

	const [show, setShow] = React.useState(false)
	const [error, setError] = React.useState("")
	const [gender, setGender] = React.useState("0")
	const [fullname, setFullname] = React.useState("")
	const [username, setUsername] = React.useState("")
	const [dateBirth, setDateBirth] = React.useState("")
	const [placeBirth, setPlaceBirth] = React.useState("")
	const [address, setAddress] = React.useState("")
	const [lastSchool, setLastSchool] = React.useState("")
	const [major, setMajor] = React.useState("")
	const [grade, setGrade] = React.useState("")
	const [email, setEmail] = React.useState("")
	const [phone, setPhone] = React.useState("")
	const [password, setPassword] = React.useState("")

	function JenisKelamin(e: string) {
		setGender(e)
	}
	function Kelas(e: string) {
		setGrade(e)
	}

	const SignUp = () => {
		const data = {
			name: fullname,
			username: username,
			gender: gender,
			date_birth: dateBirth,
			place_birth: placeBirth,
			address: address,
			school_origin: lastSchool,
			major_class: major,
			grade: grade,
			email: email,
			phone_number: phone,
			password: password,
		};

		const pass = password.toString();

		const hasLetter = /[a-zA-Z]/.test(pass);
		const hasNumber = /\d/.test(pass);

		// console.log(data, "success");
		if (
			fullname !== "" ||
			username !== "" ||
			dateBirth !== "" ||
			placeBirth !== "" ||
			address !== "" ||
			lastSchool !== "" ||
			major !== "" ||
			grade !== "" ||
			email !== "" ||
			password !== ""
		) {
			if (hasLetter && hasNumber) {

			// Masuk API Regist disini
			axios
				.post("/api/users", data)
				.then(() => {
					// console.log("Response:", response.data);
					setShow(true)
					// Redirect ke halaman login
					router.push("/login");
				})
				.catch((error) => {
					console.error("Error:", error);

					// Periksa jika error karena username/email sudah terdaftar
					if (error.response && error.response.status === 400) {
						const errorMessage =
							error.response.data?.error || "Username/Email sudah terdaftar!";
						setError(errorMessage); // Set pesan error dari server
					} else {
						setError("Terjadi kesalahan saat pendaftaran. Silakan coba lagi.");
					}
				});
			} else {
				setError("Password harus Mempunyai Huruf dan Angka!");
			}
		} else {
			setError("Silahkan isi kolom yang kosong!");
		}
	}

  return (
		<div className="w-full flex flex-col gap-3">
			<div className="w-full h-80 bg-blue-500 rounded-full mt-[-240px] mb-12"></div>
			<h1 className="font-bold text-4xl text-center">Sign Up</h1>

			<div className="mx-8 my-8 flex flex-col gap-10">
				<div className="items-start">
					<p className="font-bold text-xl">Nama Lengkap</p>
					<input
						type="text"
						value={fullname}
						autoComplete='name'
						onChange={(e) => setFullname(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Nama Pengguna</p>
					<input
						type="text"
						value={username}
						autoComplete='name'
						onChange={(e) => setUsername(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Jenis Kelamin</p>
					<select
						onChange={(e) => {
							JenisKelamin(e.target.value);
						}}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<option value="0">Perempuan</option>
						<option value="1">Laki-Laki</option>
					</select>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Tempat Lahir</p>
					<input
						type="text"
						value={placeBirth}
						onChange={(e) => setPlaceBirth(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Tanggal Lahir</p>
					<input
						type="date"
						onChange={(e) => setDateBirth(e.target.value)}
						value={dateBirth}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Alamat</p>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Asal Sekolah</p>
					<input
						type="text"
						value={lastSchool}
						onChange={(e) => setLastSchool(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Jurusan</p>
					<input
						type="text"
						value={major}
						onChange={(e) => setMajor(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Kelas</p>
					<select
						onChange={(e) => {
							Kelas(e.target.value);
						}}
						defaultValue=""
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<option value="" disabled>
							Pilih Kelas
						</option>
						<option value="X">X</option>
						<option value="XI">XI</option>
						<option value="XII">XII</option>
					</select>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Email</p>
					<input
						type="text"
						value={email}
						autoComplete='email'
						onChange={(e) => setEmail(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Phone</p>
					<input
						type="number"
						value={phone}
						inputMode='numeric'
						onChange={(e) => setPhone(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>

				<div className="items-start">
					<p className="font-bold text-xl">Password</p>
					<input
						type="password"
						value={password}
						autoComplete='current-password'
						onChange={(e) => setPassword(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<button
						onClick={SignUp}
						className="px-4 py-2 bg-blue-500 text-white text-xl font-bold rounded-full w-1/2 mx-auto"
						disabled={show}
					>
						Sign Up
					</button>
					{error != "" && (
						<p className="text-center text-red-600 font-bold">{error}</p>
					)}
					{show && (
						<p className="text-center text-green-600 font-bold">Berhasil Daftar, Silahkan login!</p>
					)}
				</div>

				<div className="h-0.5 w-full bg-black"></div>

				<div className="flex justify-center font-bold">
					<div className="">
						Already have account?&nbsp;
						<Link href="/login" className="underline">
							Log In Here?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
