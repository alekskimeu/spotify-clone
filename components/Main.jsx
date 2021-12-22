import { useRecoilState, useRecoilValue } from "recoil";
import {
	ChevronDownIcon,
	DotsHorizontalIcon,
	SearchIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistState, playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import {
	PlayIcon,
	ArrowDownIcon,
	ChevronDownIcon as ChevDown,
} from "@heroicons/react/solid";

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
		<div className="w-3/4 relative bg-zinc-900 h-screen overflow-y-scroll scrollbar-hide">
			<header className="sticky top-0 z-10">
				<div className="absolute right-8 top-5 flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
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

			<div className="flex justify-between px-8 mb-4 border-b-2 border-opacity-5">
				{/* Left */}
				<div className="flex items-center gap-5">
					<PlayIcon className="w-20 h-20 text-green-400 cursor-pointer" />
					<ArrowDownIcon className="w-7 h-7 text-white border-2 opacity-50 rounded-full p-1 cursor-pointer hover:opacity-100" />
					<DotsHorizontalIcon className="h-6 w-6 text-white opacity-50 cursor-pointer hover:opacity-100" />
				</div>

				{/* Right */}
				<div className="flex gap-3 items-center cursor-pointer">
					<SearchIcon className="h-5 w-5 text-white opacity-70" />
					<p className="text-white opacity-50 flex items-center gap-2 hover:opacity-100 transition-all duration-300">
						Custom order <ChevDown className="h-6 w-6 text-white" />
					</p>
				</div>
			</div>

			<div>
				<Songs />
			</div>
		</div>
	);
};

export default Main;
