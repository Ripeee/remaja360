"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function CategoryQuiz() {

	const searchParams = useSearchParams();

	const id = searchParams.get('id');

	const [selectedAnswer, setSelectedAnswer] = React.useState<number>(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] =
		React.useState<number>(0);
	const [data, setData] = React.useState<{
		category?: { title: string };
		questions?: {
			id: number;
			question: string;
			options?: { id: number; option: string; isCorrect: boolean }[];
		}[];
	}>({});


	const getCorrectOptionById = (id: number,qid: number) => {
		const question = data.questions?.find((question) => question.id === qid);
		if (question) {
			const option = question.options?.find((option) => option.id === id);
			return option ? option.isCorrect : undefined; // returns true, false, or undefined if not found
		}
		return undefined; // returns undefined if questionId not found
	};

	function handleSelectedAnswer(id: number, qid: number) {
		console.log(id, getCorrectOptionById(id, qid), 'lololol');
		setSelectedAnswer(id);
	}

	const handleNextQuestion = () => {
		if (currentQuestionIndex < (data.questions?.length ?? 0) - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};
	function result() {
		console.log('Lihat Hasil')
	}

	const handlePrevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const name = "KUCING";
	
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`/api/quiz?id=${id}`); // Replace with your API URL
				setData(response.data); // Update state with fetched data
			} catch (err: unknown) {
				if (err instanceof Error) {
					console.log(err.message);
				} else {
					console.log("Failed to fetch data");
				}
			}
		};

		fetchData();
	}, [id]);

  return (
		<div className="w-full flex flex-col gap-3 mb-24">
			<div className="flex flex-col pb-6 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-260px]">
				<div className="mx-10">
					<h1 className="font-bold text-4xl text-white">Hi, {name}!</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>

			<Link
				href="/e-nurse/quiz"
				className=" mx-10 text-md underline hover:text-slate-500">
				Kembali Quiz
			</Link>

			<h1 className="font-bold text-center text-2xl underline">
				<p>{data.category?.title}</p>
			</h1>
			<div className="flex justify-center">
				<Image
					src="/images/question.svg"
					alt="Quiz"
					width={400}
					height={400}
					className="mt-[-40px] mx-4 mr-[-40px] bg-fixed w-full h-5/6"
				/>
			</div>
			{(data.questions?.length ?? 0) > 0 && (
				<div>
					<p className="text-xl mx-36 mt-[-300px] w-2/6 z-10">
						{data.questions?.[currentQuestionIndex]?.question}
					</p>
					<div className="flex flex-col gap-4 mx-10 my-8 rounded-xl mt-36">
						{data.questions?.[currentQuestionIndex]?.options?.map((o) => (
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
						))}
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
					disabled={currentQuestionIndex >= (data?.questions?.length ?? 0) - 1}
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
		</div>
	);
}