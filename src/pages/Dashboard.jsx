import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAct, profileAct } from "../redux/async/authSlice";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Portfolio from "../components/Portfolio";
import Blog from "../components/Blog";
import Testimoni from "../components/Testimoni";
import Contact from "../components/Contact";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleHamburgerClick = () => {
    setShowSidebar(!showSidebar);
  };

  const resetHammburgerClick = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    dispatch(profileAct());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setShowSidebar(false);
      }
    };
    // Set event listener
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutAct());
  };

  return (
    <Router>
      <Navbar showSidebar={showSidebar} onClick={handleHamburgerClick} logout={handleLogout} />
      <div className="flex lg:justify-between justify-center items-start">
        <Sidebar showSidebar={showSidebar} onClick={resetHammburgerClick}/>
        <div className="flex flex-col w-full justify-center px-4 lg:px-16 py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimoni" element={<Testimoni />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;