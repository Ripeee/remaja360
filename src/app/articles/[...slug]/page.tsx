"use client";

import * as React from "react";
// import Image from "next/image";
// import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import "draft-js/dist/Draft.css";

// const DraftEditor = dynamic(() => import("@/app/components/DraftEditor"), {
// 	ssr: false,
// });


export default function ArtikelDetail() {
	const searchParams = useSearchParams();
  const [content, setContent] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
	// const [totalWords, setTotalWords] = React.useState<number>(0);
	const [totalPages, setTotalPages] = React.useState<number>(0);
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [loading, setLoading] = React.useState<boolean>(false);

	const limit = 150; // Jumlah kata per halaman

	const slug = searchParams.get("slug");

	React.useEffect(() => {
		const fetchArticleContent = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`/api/articles/${slug}?page=${currentPage}&limit=${limit}`,
				);
				const data = await response.json();

				if (data.article) {
					setContent(data.article.content);
					setTitle(data.article.title);
					// setTotalWords(data.totalWords);
					setTotalPages(data.totalPages);
				}
			} catch (error) {
				console.error("Failed to fetch article data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchArticleContent();
  }, [slug, currentPage]);


	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}
  const name = "Kucing";

  return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col pb-6 justify-end w-full h-80 bg-blue-500 rounded-[40px] mt-[-140px]">
				<div className="mx-10">
					<h1 className="font-bold text-3xl text-white">Hi, {name}!</h1>
					<p className="text-md text-white">Good Morning</p>
				</div>
			</div>

			<div className="flex flex-col justify-between h-full mb-24">
				<h1 className="text-center font-bold text-2xl underline my-4">
					{title}
				</h1>
				{/* <DraftEditor /> */}

				<div className="mx-8 text-start mt-[-40px]">
					<div dangerouslySetInnerHTML={{ __html: content }}></div>
					{/* <p className="whitespace-pre-line">{content}</p> */}
				</div>

				<div className="mx-16">
					<div className="flex items-center justify-between">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className={`bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50`}>
							Previous
						</button>

						<span>
							Page {currentPage} of {totalPages}{" "}
						</span>

						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className={`bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50`}>
							Next
						</button>
					</div>

					<div className="flex justify-center font-bold mt-4">
						Made with ❤️ in a Quiet Place
					</div>
				</div>
			</div>
		</div>
	);
}
