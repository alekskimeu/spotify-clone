import React from "react";
import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
	return (
		<div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
			<img
				className="w-52 mb-5"
				src="https://cdn-icons-png.flaticon.com/512/2111/2111624.png"
				alt="Spotify"
			/>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button
						className="bg-[#18D860] text-white p-4 rounded-lg font-semibold text-lg space-x-2"
						onClick={() => signIn(provider.id, { callbackUrl: "/" })}
					>
						Login with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
};

export default Login;

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: {
			providers,
		},
	};
}