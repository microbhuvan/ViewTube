import "./navbar.css";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userPic, setUserPic] = useState(
    "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
  );
  const [navbarModel, setNavbarModel] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setNavbarModel((prev) => !prev);
  };

  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbarHamburger" onClick={sideNavbarFunc}>
          <MenuIcon sx={{ fontSize: "30px" }} />
        </div>
        <div className="navbarHome">
          <PlayCircleIcon sx={{ fontSize: "30px" }} />
          <div className="navbarViewTube">ViewTube</div>
        </div>
      </div>
      <div className="navbar-middle">
        <div className="navbarSearchBox">
          <input
            type="text"
            placeholder="search"
            className="navbarInputSearch"
          />
          <div className="navbarSearchIconBox">
            <SearchIcon />
          </div>
        </div>
        <div className="navbarMic">
          <MicIcon sx={{ fontSize: "30px" }} />
        </div>
      </div>
      <div className="navbar-right">
        <VideoCallIcon sx={{ fontSize: "30px" }} />

        <NotificationsActiveRoundedIcon sx={{ fontSize: "30px" }} />

        <img src={userPic} className="userPic" onClick={handleClick} />
        {navbarModel && (
          <div className="navbarModel">
            <div className="navbarModelOption">Profile</div>
            <div className="navbarModelOption">Login</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
