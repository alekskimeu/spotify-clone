import Head from 'next/head'
import { Main, Sidebar } from "../components";

export default function Home() {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<Head>
				<title>Spotify clone</title>
			</Head>
			<main className="flex">
				<Sidebar />
				<Main />
			</main>
		</div>
	);
}
