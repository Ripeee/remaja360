"use client";

import * as React from "react";
// import Link from "next/link";
// Import Swiper React components
import axios from "axios";
import dayjs from "dayjs";

export default function Dashboard() {
	// const images = [
	// 	"https://images.unsplash.com/photo-1731331344306-ad4f902691a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
	// 	"https://images.unsplash.com/photo-1731429945593-61610daebc11?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
	// ];
	type ScoreData = {
		id: number;
		userId: string;
		userName: string;
		quizTitle: string;
		quizId: string;
		score: number;
		takenAt: string;
	};

	const [dataScore, setDataScore] = React.useState<ScoreData[]>([]);
	const [name, setName] = React.useState("");
	const [isAdmin, setIsAdmin] = React.useState(false);

  const getToken = () => {
		return localStorage.getItem("token");
  };
  
	React.useEffect(() => {
		// This runs only on the client side
		const user = localStorage.getItem("user");
    const userData = JSON.parse(user || "{}");
    const tokenn = getToken();

		if (userData.id == 0) {
			setIsAdmin(true);
		} else {
			setIsAdmin(false);
		}

    setName(userData.name || "User");
    
    axios
			.get("/api/quiz/result", {
				headers: {
					"Content-Type": "application/json", // Pastikan format sesuai dengan API Anda
					Authorization: `Bearer ${tokenn}`, // Sertakan token di header Authorization
				},
			})
      .then((res) => {
      const results = res.data.result;

      // Ambil nama dari userId untuk setiap data skor
      Promise.all(
				results.map(async (result: ScoreData) => {
					const userResponse = await axios.get(`/api/users/${result.userId}`, {
						headers: { Authorization: `Bearer ${tokenn}` },
					});
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
      ).then((updatedResults) => {
        console.log(updatedResults)
				setDataScore(updatedResults);
			});
			});
	}, []);

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
										<td className="w-1/4">{dayjs(data?.takenAt).format("DD/MM/YYYY")}</td>
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
