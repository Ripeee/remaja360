import Image from "next/image";

interface ArticleCardProps {
	imageUrl: string;
	title: string;
}

  
export default function ArticleCard({ imageUrl, title}: ArticleCardProps) {
	return (
		<>
			<Image
				src={imageUrl}
				alt={title}
				width={400}
				height={300}
				quality={100}
				priority
				className="rounded-t-xl object-cover w-full h-2/3"
			/>
			<div className="rounded-b-xl bg-slate-300 px-2 py-2 flex-grow">
				<p className="font-bold text-sm mb-2">{title}</p>
				<p className="text-sm underline text-slate-500">
					Baca disini
				</p>
			</div>
		</>
	);
}
