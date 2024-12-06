import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/Logo.svg"

export default function Navbar({ logout, loading, onClick, showSidebar }) {
  const { profile } = useSelector((state) => state.auth);
  return (
    <nav>
      <div className="px-6 py-8">
        <div className="fixed z-20 top-0 left-0 py-4 px-6 bg-dark-yellow w-full flex justify-between items-center">
        <div className="flex items-center">
            <button className="lg:hidden block mb-1 mr-4 text-2xl text-white" onClick={onClick}>
                {showSidebar ? <i class="bi bi-x-lg"></i> : <i class="bi bi-list"></i>}
            </button>
          <object data={logo} type="image/svg+xml">
            <img src={logo} alt="Logo" />
          </object>
        </div>
          <ul className="flex justify-center items-center mb-0 gap-2">
            <li>
              <button className="border-2 border-white p-2 text-white rounded-md hover:border-darkblue">
                EN
              </button>
            </li>
            <li className="relative group px-2">
              <div className="h-10 w-10 overflow-hidden flex justify-center items-center rounded-full border-2 border-white group-hover:border-darkblue/[.3] bg-peachred trasition-all duration-300">
                <img src={profile.photo} alt="" />
              </div>
              <div className="absolute z-50 top-10 right-0 bg-white min-w-56 shadow-lg rounded-md p-4 hidden group-hover:flex flex-col items-start gap-2">
                <p className="font-semibold text-peachred border-b border-darkblue/[.3] py-2 w-full">
                  {profile.username}
                </p>
                <Link to="/profile" className="w-full">
                <button className="text-darkblue/[.6] text-left hover:text-darkblue w-full">
                  <i class="bi bi-person-bounding-box mr-2"></i> Profile
                </button>
                </Link>
                <button
                  onClick={logout}
                  className="text-darkblue/[.6] text-left hover:text-peachred w-full"
                >
                  <i
                    className={`bi mr-2 ${
                      loading ? "bi-arrow-clockwise" : "bi-box-arrow-right"
                    }`}
                  ></i>
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}