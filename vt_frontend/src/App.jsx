import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { BASE_URL } from "./utils/constant";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import Profile from "./Pages/Profile/Profile";
import VideoUpload from "./Pages/VideoUpload/VideoUpload";
import SignUp from "./Pages/SignUp/SignUp";

import LikedVideos from "./Pages/LikedVideos/LikedVideos";

function App() {
  const [sideNavbar, setSideNavbar] = useState(false);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };
  return (
    <div className="app">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <SideNavbar sideNavbar={sideNavbar} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/liked" element={<LikedVideos />} />
      </Routes>
    </div>
  );
}

export default App;
