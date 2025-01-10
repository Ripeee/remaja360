"use client";

import * as React from "react";
import { utils, writeFile } from "xlsx";
import {useRouter} from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import Times from "@/app/components/Times";


type ScoreData = {
	id: number;
	userId: string;
	userName: string;
	quizTitle: string;
	quizId: string;

	name: string;
	userGender: number;
	userDateBirth: string;
	userPlaceBirth: string;
	userAddress: string;
	userSchoolOrigin: string;
	userMajorClass: string;
	userGrade: string;
	userEmail: string;
	userPhoneNumber: string;
	phone_number: number;
	score: number;
	takenAt: string;
};

export default function Dashboard() {
	const router = useRouter()

	const [dataScore, setDataScore] = React.useState<ScoreData[]>([]);
	const [name, setName] = React.useState("");
	const [isAdmin, setIsAdmin] = React.useState(false);

  const getToken = () => {
		return localStorage.getItem("token");
  };
  
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const user = localStorage.getItem("user");
				const userData = JSON.parse(user || "{}");
				const tokenn = getToken();

				// Check user role
				setIsAdmin(userData.id === 1);

				setName(userData.name || "User");

				// Fetch quiz results
				const res = await axios.get("/api/quiz/result", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${tokenn}`,
					},
				});

				const results = res.data.result;

				// Fetch user names and quiz titles for each result
				const updatedResults = await Promise.all(
					results.map(async (result: ScoreData) => {
						const userResponse = await axios.get(
							`/api/users/${result.userId}`,
							{
								headers: { Authorization: `Bearer ${tokenn}` },
							},
						);

						const quizResponse = await axios.get(
							`/api/quiz?id=${result.quizId}`,
							{
								headers: { Authorization: `Bearer ${tokenn}` },
							},
						);
						
						return {
							...result,
							userName: userResponse.data.name,
							userGender: userResponse.data.gender == 1 ? "Laki-Laki" : "Perempuan",
							userDateBirth: userResponse.data.date_birth,
							userPlaceBirth: userResponse.data.place_birth,
							userAddress: userResponse.data.address,
							userSchoolOrigin: userResponse.data.school_origin,
							userMajorClass: userResponse.data.major_class,
							userGrade: userResponse.data.grade,
							userEmail: userResponse.data.email,
							userPhoneNumber: userResponse.data.phone_number,
							quizTitle: quizResponse.data.category.title,
						};
					}),
				);

				console.log(updatedResults, 'lolo')
				setDataScore(updatedResults);
			} catch (error: unknown) {
				// console.error("Error fetching data:", error);

				if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
					// Handle 401 Unauthorized error
					alert("Session expired. Please log in again.");
					localStorage.removeItem("user");
					localStorage.removeItem("token");
					router.push("/");
				}
			}
		};

		fetchData();
	}, [router]);
  
	const handleDownload = async () => {
		
		const formattedData = dataScore.map(
			
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			({ id, userId, quizId, score, takenAt, userName, quizTitle, userGender, userPlaceBirth, userDateBirth, userAddress, userSchoolOrigin, userMajorClass, userGrade, userEmail, userPhoneNumber,  ...rest }) => ({
				...rest,
				nama_lengkap: userName,
				jenis_kelamin: userGender,
				tempat_lahir: userPlaceBirth,
				tanggal_lahir: userDateBirth,
				alamat: userAddress,
				asal_sekolah: userSchoolOrigin,
				jurusan: userMajorClass,
				kelas: userGrade,
				email: userEmail,
				nomor_hp: userPhoneNumber,
				judul_quiz: quizTitle,
				nilai: score,
				tanggal: dayjs(takenAt).format('DD-MM-YYYY'),
				waktu: dayjs(takenAt).format('HH:mm:ss')
			}),
		);

		// Sort data by ID
		// const sortedData = formattedData.sort((a, b) => a.id - b.id);

		// Convert sorted data to Excel
		const worksheet = utils.json_to_sheet(formattedData);
		const workbook = utils.book_new();
		utils.book_append_sheet(workbook, worksheet, "Sheet1");
		writeFile(workbook, "data.xlsx");
    };

	return (
		<div className="w-full flex flex-col justify-between gap-4">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10 flex-row flex justify-between items-center">
					<div className="">
						<h1 className="font-bold text-4xl text-white">
							Hi, {name.split(" ")[0]}!
						</h1>
						<p className="text-md text-white">Good <Times /></p>
					</div>
					<Image
						src="https://stikes.wdh.ac.id/wp-content/uploads/2023/12/cropped-cropped-cropped-LOGO_STIKes-PNG-e1702550833657.png"
						alt="Donor Darah"
						width={120}
						height={120}
						quality={100}
						className="w-20 h-20 object-contain"
					/>
				</div>
			</div>

			{isAdmin ? (
				<div className="h-full">
					<div className="flex flex-col items-center gap-4 my-4">
						<h1 className="font-bold text-2xl">Hasil Nilai Quiz</h1>

            <button
              onClick={handleDownload}
							className="bg-green-400 rounded-xl px-8 hover:bg-green-600 disabled:bg-blue-50">
							<p className="text-white text-center font-bold text-md py-2">
								Download
							</p>
						</button>
						<table className="table-auto w-auto mx-10 border">
							<thead className="border">
								<tr className="">
									<th className="text-start mb-2 w-1/4">Nama</th>
									<th className="text-start mb-2 w-1/4">Kelas</th>
									<th className="text-start mb-2 w-1/4">Quiz</th>
									<th className="text-start mb-2 w-1/4">Nilai</th>
									<th className="text-start mb-2 w-1/4">Tanggal</th>
								</tr>
							</thead>
							<tbody>
								{dataScore.map((data) => (
									<tr key={data.id} className="">
										<td className="border w-1/4">{data.userName}</td>
										<td className="border w-1/4">{data.userGrade}</td>
										<td className="border w-1/4">{data.quizTitle}</td>
										<td className="border w-1/4">{data.score}</td>
										<td className="border w-1/4">
											{dayjs(data?.takenAt).format("DD/MM/YYYY")}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center h-full mt-[-240px]">
					<h1 className="font-bold text-4xl">Halaman ini Khusus Admin!!</h1>
				</div>
			)}
			{/* Popular Articles Section */}
			<p className="flex justify-center font-bold my-4">
				Made with ❤️ in a Quiet Place
			</p>
		</div>
	);
}
