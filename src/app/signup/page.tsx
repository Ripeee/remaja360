"use client"

import Link from 'next/link';
import * as React from 'react'
import { useRouter } from 'next/navigation';

export default function Signup() {
	const router = useRouter()

	const [error, setError] = React.useState("")
	const [gender, setGender] = React.useState("0")
	const [fullname, setFullname] = React.useState("")
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

	function SignUp() {
		const data: object = {
			full_name: fullname,
			gender: gender,
			date_of_birth: dateBirth,
			place_of_birth: placeBirth,
			address: address,
			last_school: lastSchool,
			major: major,
			grade: grade,
			email: email,
			phone_number: phone,
			password: password,
		};
		// console.log(data);\
		const pass = password.toString();

		const hasLetter = /[a-zA-Z]/.test(pass);
		const hasNumber = /\d/.test(pass);

		if (
			fullname !== "" ||
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
				console.log(data, 'success');
				router.push("/login");
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
						onChange={(e) => setFullname(e.target.value)}
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
							setGrade(e.target.value);
						}}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						<option value="x">X</option>
						<option value="xi">XI</option>
						<option value="xii">XII</option>
					</select>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Email</p>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Phone</p>
					<input
						type="number"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>

				<div className="items-start">
					<p className="font-bold text-xl">Password</p>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<button
						onClick={SignUp}
						className="px-4 py-2 bg-blue-500 text-white text-xl font-bold rounded-full w-1/2 mx-auto">
						Sign Up
					</button>
					{error != "" && (
						<p className="text-center text-red-600 font-bold">{error}</p>
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
