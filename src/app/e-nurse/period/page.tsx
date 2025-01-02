"use client";

import * as React from "react";
import Calendar from 'react-calendar'
import "react-calendar/dist/Calendar.css"; // Pastikan untuk mengimpor CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function Period() {
	const [dataUser, setDataUser] = React.useState<{ name?: string }>({});
	const [isClient, setIsClient] = React.useState(false); // State to track if the component is mounted

	React.useEffect(() => {
		setIsClient(true); // Set to true after the component is mounted
		const user = localStorage.getItem("user");
		setDataUser(user ? JSON.parse(user) : {});
	}, []);

	function getPeriod() {
		console.log("test");
	}
	const [value, onChange] = React.useState<Value>(new Date());
	const masaSiklus = [
		new Date(2025, 1, 2),
		new Date(2025, 1, 3),
		new Date(2025, 1, 4),
		new Date(2025, 1, 5),
		new Date(2025, 1, 6),
	];

	const masaSubur = [
		new Date(2025, 1, 13),
		new Date(2025, 1, 14),
		new Date(2025, 1, 15),
		new Date(2025, 1, 16),
		new Date(2025, 1, 17),
		new Date(2025, 1, 18),
	];
	const masaOvulasi = [
		new Date(2025, 1, 17),
	];

	// Fungsi untuk menentukan apakah tanggal yang dipilih ada dalam daftar masaSubur
	function getTileClassName({ date }: { date: Date }) {
		if (masaSiklus.some(
			(masa) =>
				masa.getDate() === date.getDate() &&
				masa.getMonth() === date.getMonth() &&
				masa.getFullYear() === date.getFullYear(),
		)) return "masa-siklus";
		if (masaSubur.some(
			(masa) =>
				masa.getDate() === date.getDate() &&
				masa.getMonth() === date.getMonth() &&
				masa.getFullYear() === date.getFullYear(),
		)) return "masa-ovulasi";

		return "";
	}

	function getTileContent({ date }: { date: Date }) {
		if (masaOvulasi.some(
				(masa) =>
					masa.getDate() === date.getDate() &&
					masa.getMonth() === date.getMonth() &&
					masa.getFullYear() === date.getFullYear(),
			)) {
			return <FontAwesomeIcon icon={faCheck} className="text-green-700 ml-2" />;
		}
		if (masaSubur.some(
				(masa) =>
					masa.getDate() === date.getDate() &&
					masa.getMonth() === date.getMonth() &&
					masa.getFullYear() === date.getFullYear(),
			)) {
			return <FontAwesomeIcon icon={faCircle} className="text-green-600 ml-2" />;
		}
		return null; // Jika tidak ada, tidak menambahkan apa-apa
	}
	// Only render the calendar on the client side
	if (!isClient) {
		return null; // Prevents the hydration mismatch by returning null until mounted
	}

	return (
		<div className="w-full flex flex-col gap-3 mb-20">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">
						Hi, {dataUser.name}!
					</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>

			<h1 className="font-bold text-center text-2xl underline mt-10">
				Kalender Menstruasi
			</h1>
			<div className="mx-auto">
				<Calendar
					onChange={onChange}
					value={value}
					tileClassName={getTileClassName}
					tileContent={getTileContent} // Menambahkan konten di dalam tanggal
				/>
			</div>

			<div className="mx-10 flex flex-col gap-4">
				<p>Kapan Hari Pertama Menstruasi</p>
				<input
					type="date"
					className="w-full p-2 rounded-md border"
					placeholder="Masukkan Tanggal"
				/>
				<p>Kapan Menstruasi Berlangsung (Hari)</p>
				<div className="p-2 rounded-md border">
					<select name="" id="" className="w-full">
						<option value="3">3 Hari</option>
						<option value="4">4 Hari</option>
						<option value="5">5 Hari</option>
						<option value="6">6 Hari</option>
						<option value="7">7 Hari</option>
					</select>
				</div>

				<p>Berapa Siklus Bulanan Menstruasimu (Hari)</p>
				<div className="p-2 rounded-md border">
					<select name="" id="" className="w-full">
						<option value="25">25 Hari</option>
						<option value="26">26 Hari</option>
						<option value="27">27 Hari</option>
						<option value="28">28 Hari</option>
						<option value="29">29 Hari</option>
						<option value="30">30 Hari</option>
						<option value="31">31 Hari</option>
						<option value="32">32 Hari</option>
						<option value="33">33 Hari</option>
						<option value="34">34 Hari</option>
						<option value="35">35 Hari</option>
						<option value="36">36 Hari</option>
						<option value="37">37 Hari</option>
						<option value="38">38 Hari</option>
					</select>
				</div>
			</div>
			<button
				onClick={getPeriod}
				className="bg-blue-400 rounded-xl px-8 hover:bg-blue-600 disabled:bg-blue-50 mx-auto mb-10 mt-4">
				<p className="text-white text-center font-bold text-md py-2">
					Cek Siklus Menstruasimu
				</p>
			</button>
		</div>
	);
}
