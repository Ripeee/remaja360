"use client";

import * as React from "react";
import { utils, writeFile } from "xlsx";
import {useRouter} from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";

type ScoreData = {
  id: number;
  userId: string;
  userName: string;
  quizTitle: string;
  quizId: string;
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
				setIsAdmin(userData.id === 0);

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
							quizTitle: quizResponse.data.category.title,
						};
					}),
				);

				setDataScore(updatedResults);
			} catch (error: unknown) {
				console.error("Error fetching data:", error);

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
			({ id, userId, quizId, score, takenAt, userName, quizTitle, ...rest }) => ({
				...rest,
				nama_lengkap: userName,
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
			<div className="flex flex-col pb-10 justify-end w-full h-1/3 bg-blue-500 rounded-[40px] mt-[-60px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">
						Hi, {name.split(" ")[0]}!
					</h1>
					<p className="text-md text-white">Good Morning</p>
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
								Lihat Hasil Test Quiz
							</p>
						</button>
						<table className="table-auto w-auto mx-10">
							<thead>
								<tr className="">
									<th className="text-start mb-2 w-1/4">Nama</th>
									<th className="text-start mb-2 w-1/4">Quiz</th>
									<th className="text-start mb-2 w-1/4">Nilai</th>
									<th className="text-start mb-2 w-1/4">Tanggal</th>
								</tr>
							</thead>
							<tbody>
								{dataScore.map((data) => (
									<tr key={data.id} className="">
										<td className="w-1/4">{data.userName}</td>
										<td className="w-1/4">{data.quizTitle}</td>
										<td className="w-1/4">{data.score}</td>
										<td className="w-1/4">
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
