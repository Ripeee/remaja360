"use client";

import * as React from "react";
import Calendar from 'react-calendar'
import "react-calendar/dist/Calendar.css"; // Pastikan untuk mengimpor CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function Period() {
	const [dataUser, setDataUser] = React.useState<{ name?: string }>({});
	const [isClient, setIsClient] = React.useState<boolean>(false); // State to track if the component is mounted
	const [datePeriod, setDatePeriod] = React.useState<string>(""); // State to track if the component is mounted
	const [dayPeriod, setDayPeriod] = React.useState<string>(""); // State to track if the component is mounted
	const [monthPeriod, setMonthPeriod] = React.useState<string>(""); // State to track if the component is mounted
	const [masaSiklus, setMasaSiklus] = React.useState<Date[]>([]);
	const [masaSiklusSelanjutnya, setMasaSiklusSelanjutnya] = React.useState<Date[]>([]);
	const [masaSubur, setMasaSubur] = React.useState<Date[]>([]);
	const [masaOvulasi, setMasaOvulasi] = React.useState<Date[]>([]);

React.useEffect(() => {
	setIsClient(true);
	const user = localStorage.getItem("user");
	setDataUser(user ? JSON.parse(user) : {});
}, []);
	
	function periodDate(e: string) {
		setDatePeriod(e);
	}
	function periodDay(e: string) {
		setDayPeriod(e);
	}
	function periodMonth(e: string) {
		setMonthPeriod(e);
	}


function getPeriod() {
	const startDate = new Date(datePeriod); // Hari pertama menstruasi
	const duration = parseInt(dayPeriod); // Durasi menstruasi (dalam hari)
	const cycleLength = parseInt(monthPeriod); // Panjang siklus menstruasi

	const masaSiklus: Date[] = [];
	const masaSubur: Date[] = [];
	const masaOvulasi: Date[] = [];
  const masaSiklusSelanjutnya: Date[] = [];

	// Menghitung masa menstruasi (siklus)
	for (let i = 0; i < duration; i++) {
		masaSiklus.push(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000));
	}

	// Menghitung masa menstruasi untuk siklus berikutnya
	const nextCycleStart = new Date(
		startDate.getTime() + cycleLength * 24 * 60 * 60 * 1000,
	);
	for (let i = 0; i < duration; i++) {
		masaSiklusSelanjutnya.push(
			new Date(nextCycleStart.getTime() + i * 24 * 60 * 60 * 1000),
		);
	}

	// Menghitung masa subur
	for (let i = cycleLength - 15; i < cycleLength - 10; i++) {
		masaSubur.push(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000));
	}

	// Menghitung masa ovulasi (hari ke-14 sebelum siklus berikutnya)
	const ovulasiDate = new Date(
		startDate.getTime() + (cycleLength - 14) * 24 * 60 * 60 * 1000,
	);
	masaOvulasi.push(ovulasiDate);

	// Perbarui state untuk kalender
	setMasaSiklus(masaSiklus);
	setMasaSubur(masaSubur);
	setMasaOvulasi(masaOvulasi);
  setMasaSiklusSelanjutnya(masaSiklusSelanjutnya);

	// console.log("Masa Siklus:", masaSiklus);
	// console.log("Masa Siklus Berikutnya:", masaSiklusSelanjutnya);
	// console.log("Masa Subur:", masaSubur);
	// console.log("Masa Ovulasi:", masaOvulasi);
}

function getTileClassName({ date }: { date: Date }) {
	if (
		masaSiklus.some(
			(masa) =>
				masa.getDate() === date.getDate() &&
				masa.getMonth() === date.getMonth() &&
				masa.getFullYear() === date.getFullYear(),
		)
	) {
		return "masa-siklus";
	}
	if (
		masaSiklusSelanjutnya.some(
			(masa) =>
				masa.getDate() === date.getDate() &&
				masa.getMonth() === date.getMonth() &&
				masa.getFullYear() === date.getFullYear(),
		)
	) {
		return "masa-siklus-selanjutnya";
	}
	if (
		masaSubur.some(
			(masa) =>
				masa.getDate() === date.getDate() &&
				masa.getMonth() === date.getMonth() &&
				masa.getFullYear() === date.getFullYear(),
		)
	) {
		return "masa-subur";
	}

	return "";
}

function getTileContent({ date }: { date: Date }) {
	if (
		masaOvulasi.some(
			(masa) =>
				masa.getDate() === date.getDate() &&
				masa.getMonth() === date.getMonth() &&
				masa.getFullYear() === date.getFullYear(),
		)
	) {
		return <FontAwesomeIcon icon={faCheck} className="text-green-700 ml-2" />;
	}

	if (
		masaSubur.some(
			(masa) =>
				masa.getDate() === date.getDate() &&
				masa.getMonth() === date.getMonth() &&
				masa.getFullYear() === date.getFullYear(),
		)
	) {
		return <FontAwesomeIcon icon={faCircle} className="text-green-600 ml-2" />;
	}
	return null;
}

	// Only render the calendar on the client side
	if (!isClient) {
		return null; // Prevents the hydration mismatch by returning null until mounted
	}

	return (
		<div className="w-full flex flex-col gap-3 mb-20">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px] md:mb-4">
				<div className="mx-4 md:mx-10 flex-row flex justify-between items-center">
					<div className="">
						<h1 className="font-bold text-2xl md:text-4xl text-white">
							Hi, {dataUser.name?.split(" ")[0]}!
						</h1>
						<p className="text-md text-white">Ayo jadi remaja cerdas !!</p>
					</div>
					<Image
						src="https://stikes.wdh.ac.id/wp-content/uploads/2023/12/cropped-cropped-cropped-LOGO_STIKes-PNG-e1702550833657.png"
						alt="Logo Stikes"
						width={120}
						height={120}
						quality={100}
						className="w-20 h-20 object-contain"
					/>
				</div>
			</div>

			<Link
				href="/e-nurse"
				className="mx-4 md:mx-10 text-md underline hover:text-slate-500">
				Kembali E-Nurse
			</Link>

			<h1 className="font-bold text-center text-2xl underline">
				Kalender Menstruasi
			</h1>
			<div className="mx-auto">
				<Calendar
					// onChange={onChange}
					// value={value}
					tileClassName={getTileClassName}
					tileContent={getTileContent} // Menambahkan konten di dalam tanggal
				/>
			</div>

			<div className="grid grid-cols-4 gap-2 mx-10 my-2 items-center">
				<div className="p-4 masa-siklus-selanjutnya"></div>
				<p>Masa Siklus Selanjutnya</p>
				<div className="p-4 masa-siklus"></div>
				<p>Masa Siklus Menstruasi</p>
				<FontAwesomeIcon icon={faCircle} className="text-green-600 ml-2" />
				<p>Masa Subur</p>
				<FontAwesomeIcon icon={faCheck} className="text-green-600 ml-2" />
				<p>Masa Ovulasi</p>
			</div>

			<div className="mx-10 flex flex-col gap-4">
				<div className="">
					<p className="font-bold">Kapan Hari Pertama Menstruasi terakhirmu?</p>
					<input
						type="date"
						className="w-full p-2 rounded-md border"
						placeholder="Masukkan Tanggal"
						onChange={(e) => {
							periodDate(e.target.value);
						}}
					/>
				</div>
				<div className="">
					<p className="font-bold">
						Biasanya berapa hari Menstruasi Berlangsung?
					</p>
					<div className="p-2 rounded-md border">
						<select
							onChange={(e) => {
								periodDay(e.target.value);
							}}
							defaultValue=""
							name=""
							id=""
							className="w-full">
							<option value="3">3 Hari</option>
							<option value="4">4 Hari</option>
							<option value="5">5 Hari</option>
							<option value="6">6 Hari</option>
							<option value="7">7 Hari</option>
						</select>
					</div>
				</div>

				<div className="">
					<p className="font-bold">
						Berapa Rata-Rata Siklus Bulanan Menstruasimu (Hari)
					</p>
					<div className="p-2 rounded-md border">
						<select
							onChange={(e) => {
								periodMonth(e.target.value);
							}}
							defaultValue=""
							name=""
							id=""
							className="w-full">
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
