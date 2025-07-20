import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import Profile from "./Pages/Profile/Profile";

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };
  return (
    <div className="app">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <SideNavbar sideNavbar={sideNavbar} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />}></Route>
        <Route path="/watch/:id" element={<Video />}></Route>
        <Route path="/user/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
