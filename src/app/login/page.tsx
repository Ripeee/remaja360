"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react'
import axios from 'axios';

export default function Login() {

	const router = useRouter();

	const [emailOrUsername, setEmailOrUsername] = React.useState("")
	const [password, setPassword] = React.useState("")

	function handleEmail(value: string) {
		setEmailOrUsername(value)
	}
	function handlePassword(value: string | number) {
		// console.log(value)
		setPassword(String(value))
	}

	const login = async () => {
		try {
			const response = await axios.post("/api/auth/login", {
				emailOrUsername,
				password,
			});

			if (response.data.token) {
				// Store the token in localStorage
				localStorage.setItem("token", response.data.token);

				// Optionally, you can store the user data as well
				localStorage.setItem("user", JSON.stringify(response.data.user));

				// Redirect user to another page, e.g., home page
				router.push("/dashboard");
			} else {
				alert("Invalid credentials");
			}
		} catch (err) {
			alert("Password atau Email Salah");
			console.log(err);
		}
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
						value={emailOrUsername}
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

				{/* <div className="flex justify-end underline">
					<Link href="" className="text-sm">
						Forgot Password?
					</Link>
				</div> */}

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
