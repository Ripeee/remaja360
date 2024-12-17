"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function Profile() {
	const [username, setUsername] = React.useState("Franciska");
  const [password, setPassword] = React.useState("kucing20");
  const [show, setShow] = React.useState(false);
  
  const maskPassword = '*'.repeat(password.length)
  function logout() {
    console.log('logout')
  }

	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col justify-end w-full h-2/5 bg-blue-500 rounded-[50px] mt-[-200px]">
				<h1 className="font-bold text-4xl text-center text-white mb-10">
					Hi {username}
				</h1>
			</div>

      <Link href="" className="text-md font-bold mx-10">
        Back to Home
      </Link>
      
			<div className="flex justify-center">
				<Image
					src="https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					width={400}
					height={400}
					alt="profile"
					quality={100}
					className="rounded-full w-60 h-60"
				/>
			</div>
			<div className="mx-8 my-8 flex flex-col gap-10">
				<div className="items-start">
					<p className="font-bold text-xl">Username</p>
					<p className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						{username}
					</p>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Password</p>
					<p className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg">
						{show ? password : maskPassword}
					</p>
				</div>

				<div className="flex justify-end underline">
					<Link href="" className="text-sm">
						Forgot Password?
					</Link>
				</div>

				<button
					onClick={logout}
					className="px-4 py-2 bg-blue-500 text-white text-xl font-bold rounded-full w-1/2 mx-auto">
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
