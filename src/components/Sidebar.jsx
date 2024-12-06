import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ showSidebar, onClick }) => {
  const [activeLink, setActiveLink] = useState("");
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Portfolio",
      link: "/portfolio",
    },
    {
      name: "Testimonial",
      link: "/testimoni",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const resetLinkClick = () => {
    setActiveLink("");
  };

  return (
    <div className={`${showSidebar ? "flex z-10": "hidden"} lg:flex flex-col left-0 lg:w-56`}>
      <div className={`fixed flex backdrop-blur-sm ${showSidebar && "bg-black/[.3] w-full"} h-screen`} >
        <div className={`${showSidebar && "bg-white"} flex-col gap-4 py-12 px-6`}>
        <Link to="/">
        <div onClick={resetLinkClick} className="text-md text-dark-yellow/[0.85] hover:text-dark-yellow font-bold">Dashboard</div>
        </Link>
        <ul onClick={onClick} className="font-raleway border-white flex flex-col border-l">
          {navLinks.map((links, index) => (
            <Link to={links.link} key={index}>
              <li
                onClick={() => handleLinkClick(links.name)}
                className={`${
                  activeLink === links.name
                    ? "text-dark-yellow border-l-2"
                    : "text-black"
                } hover:text-dark-yellow py-2 pl-2 pr-20 hover:border-l-2`}
              >
                {links.name}
              </li>
            </Link>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;