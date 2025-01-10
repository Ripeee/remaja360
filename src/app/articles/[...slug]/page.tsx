"use client";

import * as React from "react";
import Times from "@/app/components/Times";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ArtikelDetail() {
	const searchParams = useSearchParams();
  const [content, setContent] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
	// const [totalWords, setTotalWords] = React.useState<number>(0);
	const [totalPages, setTotalPages] = React.useState<number>(0);
	const [currentPage, setCurrentPage] = React.useState<number>(1);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [dataUser, setDataUser] = React.useState<{ name?: string }>({})
	const [token, setToken] = React.useState<string | null>(null);

	const limit = 150; // Jumlah kata per halaman

	const slug = searchParams.get("slug");
	const getToken = () => {
		return localStorage.getItem("token");
	};

	React.useEffect(() => {
		const fetchArticleContent = async () => {
			setLoading(true);
			const tokenn = getToken()
			
			try {
				setToken(tokenn);
				const user = localStorage.getItem("user");
				setDataUser(user ? JSON.parse(user) : {});

				const response = await fetch(
					`/api/articles/${slug}?page=${currentPage}&limit=${limit}`,
					{
						method: "GET", // Secara default GET, dapat dihapus
						headers: {
							"Content-Type": "application/json", // Pastikan format sesuai dengan API Anda
							Authorization: `Bearer ${tokenn}`, // Sertakan token di header Authorization
						},
					},
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
  }, [slug, currentPage, token]);


	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

  return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex flex-col pb-10 justify-end w-full h-96 bg-blue-500 rounded-[40px] mt-[-140px]">
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
