import { useRecoilState, useRecoilValue } from "recoil";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
	"from-indigo-500",
	"from-blue-500",
	"from-green-500",
	"from-red-500",
	"from-yellow-500",
	"from-pink-500",
	"from-pink-500",
];

const Main = () => {
	const { data: session } = useSession();
	const spotifyApi = useSpotify();
	const [color, setColor] = useState(null);
	const playlistId = useRecoilValue(playlistIdState);
	const [playlist, setPlaylist] = useRecoilState(playlistState);

	useEffect(() => {
		setColor(shuffle(colors).pop());
	}, [playlistId]);

	useEffect(() => {
		spotifyApi
			.getPlaylist(playlistId)
			.then((data) => setPlaylist(data.body))
			.catch((err) => console.log("Something went wrong"));
	}, [spotifyApi, playlistId]);
	return (
		<div className="flex-grow">
			<header className="absolute top-5 right-8">
				<div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
					<img
						className="rounded-full w-10 h-10"
						src={session?.user.image}
						alt={session?.user.name}
					/>
					<h2>{session?.user.name}</h2>
					<ChevronDownIcon className="h-5 w-5" onClick={() => signOut()} />
				</div>
			</header>
			<section
				className={`flex items-center space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
			>
				<img
					className="h-44 w-44 shadow-2xl"
					src={playlist?.images?.[0]?.url}
					alt=""
				/>
				<div>
					<p className="text-sm">PLAYLIST</p>
					<h1 className="text-2xl md:text-3xl xl:text-7xl font-bold">
						{playlist?.name}
					</h1>
					<p className="text-gray-100 opacity-70 text-sm pr-5 mt-4">
						{playlist?.description}
					</p>
				</div>
			</section>

			<div className="h-screen overflow-y-scroll scrollbar-hide">
				<Songs />
			</div>
		</div>
	);
};

export default Main;