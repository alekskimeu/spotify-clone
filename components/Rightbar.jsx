import React from "react";

const Rightbar = () => {
	return (
		<div className="text-white py-4 px-2 md:py-10 md:px-4 w-1/4 bg-neutral-900">
			<h3>Friend activity</h3>
			<p className="text-sm opacity-70 mt-2">
				Connect with Facebook to see what your friends are playing
			</p>
			<button className="bg-blue-500 py-3 tracking-widest px-1 md:px-5 rounded-full uppercase text-xs md:text-sm my-6">
				connect with facebook
			</button>
			<p className="text-xs opacity-70">
				We will never post anything without your permission. Show and hide
				Friend activity from Settings
			</p>
		</div>
	);
};

export default Rightbar;
