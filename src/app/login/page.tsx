"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react'

export default function Login() {

	const router = useRouter();

	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")

	function handleEmail(value: string) {
		setEmail(value)
	}
	function handlePassword(value: string | number) {
		console.log(value)
		setPassword(String(value))
	}

	function login() {
		console.log(email, password)
		router.push('/profile')
		// const pass = password.toString();
		
		// const hasLetter = /[a-zA-Z]/.test(pass);
		// const hasNumber = /\d/.test(pass);
		
		// if (hasLetter && hasNumber) {
		// 	setPassword(pass);
		// } else if (email == "" || password == "") {
		// 	console.error("email atau Password harus di isi");
		// } else {
		// 	console.error("Password must contain both letters and numbers");
		// }
	}

  return (
		<div className="w-full flex flex-col gap-3">
			<div className="w-full h-80 bg-blue-500 rounded-full mt-[-240px] mb-12"></div>
			<h1 className="font-bold text-4xl text-center">Login</h1>

			<div className="mx-8 my-8 flex flex-col gap-10">
				<div className="items-start">
					<p className="font-bold text-xl">Email</p>
					<input
						type="text"
						value={email}
						onChange={(e) => handleEmail(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Password</p>
					<input
						type="password"
						value={password}
						onChange={(e) => handlePassword(e.target.value)}
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>

				<div className="flex justify-end underline">
					<Link href="" className="text-sm">
						Forgot Password?
					</Link>
				</div>

				<button onClick={login} className="px-4 py-2 bg-blue-500 text-white text-xl font-bold rounded-full w-1/2 mx-auto">
					LOG IN
				</button>

				<div className="h-0.5 w-full bg-black"></div>

				<div className="flex justify-center font-bold">
					<div className="">
						Don’t have account?&nbsp;
						<Link href="/signup" className="underline">
							Sign Up Here?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}