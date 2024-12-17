import Link from 'next/link';
import React from 'react'

export default function Signup() {
  return (
		<div className="w-full flex flex-col gap-3">
			<div className="w-full h-80 bg-blue-500 rounded-full mt-[-240px] mb-12"></div>
			<h1 className="font-bold text-4xl text-center">Sign Up</h1>

			<div className="mx-8 my-8 flex flex-col gap-10">
				<div className="items-start">
					<p className="font-bold text-xl">Full Name</p>
					<input
						type="text"
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Email</p>
					<input
						type="text"
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Username</p>
					<input
						type="text"
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Password</p>
					<input
						type="password"
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>
				<div className="items-start">
					<p className="font-bold text-xl">Phone</p>
					<input
						type="number"
						className="px-4 h-12 mt-2 w-full bg-slate-200 rounded-xl text-lg"
					/>
				</div>

				<div className="flex justify-end underline">
					<Link href="" className="text-sm">
						Forgot Password?
					</Link>
				</div>

				<button className="px-4 py-2 bg-blue-500 text-white text-xl font-bold rounded-full w-1/2 mx-auto">
					Sign Up
				</button>

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
