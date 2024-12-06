import React from "react";

export default function Home({username}) {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-dark-yellow rounded-xl h-96 font-raleway">
      <h1 className="text-7xl font-bold text-white py-6">Welcome, <span className="underline">{username}</span></h1>
      <a className="text-xl font bold text-black">Let's Get Started! <i class="bi bi-arrow-right-short"></i></a>
    </div>
    );
}