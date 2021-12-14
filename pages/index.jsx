import Head from 'next/head'
import Sidebar from "../components/Sidebar";

export default function Home() {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<Head>
				<title>Spotify clone</title>
			</Head>
			<main className="">
				<Sidebar />
				{/* Main */}
			</main>
		</div>
	);
}
