import Image from "next/image";

export default function SplashScreen() {
	return (
		<div className="bg-blue-500 flex flex-col items-center justify-center h-screen w-screen px-4">
			{/* Adjust image size based on screen width */}
			<Image
				src="/images/logo.png"
				alt="SplashScreen"
				width={300}
				height={300}
				priority={true}
				className="w-full sm:w-48 sm:h-48 md:w-80 md:h-80"
			/>
		</div>
	);
}
