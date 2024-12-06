import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { profile } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col justify-center items-center w-full bg-dark-yellow rounded-xl h-96 font-raleway">
      <h1 className="text-7xl font-bold text-white py-6">Welcome, <span className="underline">{profile.username}</span></h1>
      <a className="text-xl font bold text-black">Let's Get Started! <i class="bi bi-arrow-right-short"></i></a>
    </div>
    );
}

export default Home;