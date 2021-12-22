import { getSession } from "next-auth/react";
import Head from "next/head";
import { Main, Player, Sidebar } from "../components";

export default function Home() {
	return (
		<div className="bg-black h-screen overflow-hidden font-sans tracking-wide">
			<Head>
				<title>Spotify clone</title>
			</Head>
			<main className="flex">
				<Sidebar />
				<Main />
			</main>

			<div className="sticky bottom-0">
				<Player />
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: {
			session,
		},
	};
}
