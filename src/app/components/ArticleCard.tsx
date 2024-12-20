import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
	imageUrl: string;
	title: string;
	link: string;
}

  
export default function ArticleCard({ imageUrl, title, link }: ArticleCardProps) {
	return (
		<Link href={link} className="rounded-xl bg-black flex flex-col h-60">
			<Image
				src={imageUrl}
				alt={title}
				width={400}
				height={300}
				quality={100}
				priority
				className="rounded-t-xl object-cover w-full h-2/3"
			/>
			<div className="rounded-b-xl bg-slate-300 px-2 py-1 flex-grow">
				<p className="font-bold text-sm mb-2">{title}</p>
				<p className="text-sm underline text-slate-500">
					Baca disini
				</p>
			</div>
		</Link>
	);
}
