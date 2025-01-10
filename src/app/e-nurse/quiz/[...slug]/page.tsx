"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Times from "@/app/components/Times";

export default function CategoryQuiz() {
	const router = useRouter();

	const searchParams = useSearchParams();

	const id = searchParams.get("id");

	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const [token, setToken] = React.useState<string | null>(null);
	const [selectedAnswers, setSelectedAnswers] = React.useState<number[]>([]);
	const [dataUser, setDataUser] = React.useState<{ name?: string, id?: number }>({})
	const [correctAnswersCount, setCorrectAnswersCount] = React.useState<number>(0);
	const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
	const [showQuestion, setShowQuestion] = React.useState<boolean>(false);
	const [showResult, setShowResult] = React.useState<boolean>(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(0);
	const [data, setData] = React.useState<{
		category?: { title: string };
		questions?: {
			id: number;
			question: string;
			options?: { id: number; option: string; isCorrect: boolean }[];
		}[];
	}>({});

	const getToken = () => {
		return localStorage.getItem("token");
	};

	React.useEffect(() => {
		const user = localStorage.getItem("user");
		const tokenn = getToken();
		setDataUser(user ? JSON.parse(user) : {});
		setToken(tokenn);

		axios
			.get(`/api/quiz?id=${id}`, {
				method: "GET", // Secara default GET, dapat dihapus
				headers: {
					"Content-Type": "application/json", // Pastikan format sesuai dengan API Anda
					Authorization: `Bearer ${tokenn}`, // Sertakan token di header Authorization
				},
			})
			.then((response) => {
				setData(response.data); // Update state with fetched data
				setIsLoading(false);
				setShowQuestion(true);
			})
			.catch((err) => {
				console.log(err);
				localStorage.removeItem('user')
				localStorage.removeItem('token')
				router.push('/login')
			});
	}, [id, router, token]);


	const getCorrectOptionById = (id: number, qid: number) => {
		const question = data.questions?.find((question) => question.id === qid);
		if (question) {
			const option = question.options?.find((option) => option.id === id);
			return option ? option.isCorrect : undefined; // returns true, false, or undefined if not found
		}
		return undefined; // returns undefined if questionId not found
	};

	function handleSelectedAnswer(id: number, qid: number) {
		// console.log(id, getCorrectOptionById(id, qid), "cek jawaban benar ");

		const newSelectedAnswers = [...selectedAnswers];
		const previousAnswer = newSelectedAnswers[currentQuestionIndex];
		const isPreviouslyCorrect = previousAnswer
			? getCorrectOptionById(previousAnswer, qid)
			: false;
		const isNewCorrect = getCorrectOptionById(id, qid);

		// Update the selected answer
		newSelectedAnswers[currentQuestionIndex] = id;
		setSelectedAnswers(newSelectedAnswers);
		setSelectedAnswer(id);

		// Adjust correctAnswersCount based on the answer correctness
		if (!isPreviouslyCorrect && isNewCorrect) {
			setCorrectAnswersCount((prev) => prev + 1);
		} else if (isPreviouslyCorrect && !isNewCorrect) {
			setCorrectAnswersCount((prev) => prev - 1);
		}
	}

	const handleNextQuestion = () => {
		if (currentQuestionIndex < (data.questions?.length ?? 0) - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
			const nextAnswer = selectedAnswers[currentQuestionIndex + 1] || null;
			setSelectedAnswer(nextAnswer); // Set selected answer for the next question
		}
	};

	const handlePrevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
			const prevAnswer = selectedAnswers[currentQuestionIndex - 1] || null;
			setSelectedAnswer(prevAnswer); // Set selected answer for the previous question
		}
	};

	const calculateScore = () => {
		const totalQuestions = data.questions?.length ?? 0;

		return ((correctAnswersCount / totalQuestions) * 100).toFixed(2); // Score in percentage
	};

	function result() {
		setShowQuestion(false);
		setShowResult(true);
		const dataResult = {
			userId: dataUser.id,
			quizId: parseInt(id || "0"),
			score: parseFloat(calculateScore())
		}
		
		axios.post(`/api/quiz/result`, dataResult, {
			headers: {
				"Content-Type": "application/json", // Pastikan format sesuai dengan API Anda
				Authorization: `Bearer ${token}`, // Sertakan token di header Authorization
			},
		}).then((res) => {
			console.log(res)
		}).catch((error) => {
			console.log(error)
		})

		console.log(dataResult,' resulttt')
		// console.log(`Your score is: ${score} out of ${data.questions?.length}`);
	}
	
	return (
		<div className="w-full flex flex-col gap-3 mb-24">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-240px]">
				<div className="mx-10 flex-row flex justify-between items-center">
					<div className="">
						<h1 className="font-bold text-4xl text-white">
							Hi, {dataUser.name?.split(" ")[0]}!
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

			<Link
				href="/e-nurse/quiz"
				className=" mx-10 text-md underline hover:text-slate-500">
				Kembali Quiz
			</Link>

			{isLoading ? (
				<>
					<p className="text-center">Loading...</p>
					{/* <button
						onClick={() => router.push("/")}
						className="bg-blue-400 rounded-xl px-8 hover:bg-blue-600 disabled:bg-blue-50 mx-20">
						<p className="text-white text-center font-bold text-md py-2">
							Kembali Ke Login
						</p>
					</button> */}
				</>
			) : (
				<>
					{showQuestion && (
						<>
							<h1 className="font-bold text-center text-2xl underline">
								{data.category?.title}
							</h1>
							<p className="font-bold text-center text-xl underline">
								{"Pertanyaan " + (currentQuestionIndex + 1) + ' dari ' + data.questions?.length} 
							</p>
							<div className="flex justify-center">
								<Image
									src="/images/question.svg"
									alt="Quiz"
									width={400}
									height={400}
									priority={true}
									className="mt-[-40px] mx-4 mr-[-40px] bg-fixed w-full h-5/6"
								/>
							</div>
							{(data.questions?.length ?? 0) > 0 && (
								<div>
									<p className="text-xl mx-36 mt-[-300px] w-2/6 z-10">
										{data.questions?.[currentQuestionIndex]?.question}
									</p>
									<div className="flex flex-col gap-4 mx-10 my-8 rounded-xl mt-36">
										{data.questions?.[currentQuestionIndex]?.options?.map(
											(o) => (
												<button
													key={o.id}
													onClick={() =>
														handleSelectedAnswer(
															o.id,
															data.questions?.[currentQuestionIndex]?.id ?? 0,
														)
													}
													className={`bg-slate-400 rounded-xl w-full hover:bg-slate-700 ${
														selectedAnswer === o.id && "bg-slate-700"
													}`}>
													<p className="text-white text-center font-bold text-md py-2">
														{o.option}
													</p>
												</button>
											),
										)}
									</div>
								</div>
							)}

							<div className="flex justify-around mx-10 gap-8">
								<button
									onClick={handlePrevQuestion}
									disabled={currentQuestionIndex === 0}
									className="bg-blue-400 rounded-xl w-full hover:bg-sky-600 disabled:bg-blue-50">
									<p className="text-white text-center font-bold text-md py-2">
										Sebelumnya
									</p>
								</button>
								<button
									onClick={handleNextQuestion}
									disabled={
										currentQuestionIndex >= (data?.questions?.length ?? 0) - 1
									}
									className="bg-blue-400 rounded-xl w-full hover:bg-sky-600 disabled:bg-blue-50">
									<p className="text-white text-center font-bold text-md py-2">
										Selanjutnya
									</p>
								</button>
							</div>
							{currentQuestionIndex >= (data?.questions?.length ?? 0) - 1 && (
								<div className="flex justify-center mx-auto">
									<button
										onClick={result}
										className="bg-green-400 rounded-xl px-8 hover:bg-green-600 disabled:bg-blue-50">
										<p className="text-white text-center font-bold text-md py-2">
											Lihat Hasil
										</p>
									</button>
								</div>
							)}
						</>
					)}
					{showResult && (
						<>
							<h1 className="font-bold text-center text-4xl underline my-4">
								{"HASIL QUIZ " + data.category?.title.toUpperCase()}
							</h1>
							{Number(calculateScore()) == 100 && (
								<div className="mx-10 py-8 gap-4 flex flex-col bg-sky-200 rounded-2xl">
									<Image
										src={`/images/good-score.svg`}
										alt="Quiz"
										width={300}
										height={300}
										className="w-full h-60"
									/>
									<h1 className="font-bold text-center text-4xl">
										{calculateScore()}%
										<br />
										SANGAT BAIK
									</h1>
									<p className="text-center text-xl mx-10">
										Bagus! Kamu punya pemahaman yang solid tentang{" "}
										{data.category?.title}. Terus jaga kesehatanmu ya!
									</p>
								</div>
							)}
							{Number(calculateScore()) >= 80 &&
								Number(calculateScore()) < 100 && (
									<div className="mx-10 py-8 gap-4 flex flex-col bg-sky-200 rounded-2xl">
										<Image
											src={`/images/nice_score.svg`}
											alt="Quiz"
											width={300}
											height={300}
											className="w-full h-60"
										/>
										<h1 className="font-bold text-center text-4xl">
											{calculateScore()}%
											<br />
											BAIK
										</h1>
										<p className="text-center text-xl mx-10">
											Bagus! Kamu punya pemahaman yang solid tentang{" "}
											{data.category?.title}. Terus jaga kesehatanmu ya!
										</p>
									</div>
								)}
							{Number(calculateScore()) > 50 &&
								Number(calculateScore()) < 80 && (
									<div className="mx-10 py-8 gap-4 flex flex-col bg-sky-200 rounded-2xl">
										<Image
											src={`/images/bad_score.svg`}
											alt="Quiz"
											width={300}
											height={300}
											className="w-full h-60"
										/>
										<h1 className="font-bold text-center text-4xl">
											{calculateScore()}%
											<br />
											KURANG
										</h1>
										<p className="text-center text-xl mx-10">
											Hmm, sepertinya kamu perlu belajar lebih banyak tentang{" "}
											{data.category?.title}. Ini kesempatan untuk mencari tahu
											lebih banyak demi kesehatanmu!
										</p>
									</div>
								)}
							{Number(calculateScore()) <= 50 && (
								<div className="mx-10 py-8 gap-4 flex flex-col bg-sky-200 rounded-2xl">
									<Image
										src={`/images/bad_score.svg`}
										alt="Quiz"
										width={300}
										height={300}
										className="w-full h-60"
									/>
									<h1 className="font-bold text-center text-4xl">
										{calculateScore()}%
										<br />
										BURUK
									</h1>
									<p className="text-center text-xl mx-10">
										Aduh, sepertinya kamu perlu lebih banyak info tentang{" "}
										{data.category?.title}. Jangan ragu untuk belajar dan
										diskusi, ya! Kesehatanmu penting!
									</p>
								</div>
							)}
							<div className="flex justify-center mx-auto my-8">
								<button
									onClick={() => router.back()}
									className="bg-blue-400 rounded-xl px-8 hover:bg-blue-600 disabled:bg-blue-50">
									<p className="text-white text-center font-bold text-md py-2">
										Quiz Lainnya
									</p>
								</button>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
