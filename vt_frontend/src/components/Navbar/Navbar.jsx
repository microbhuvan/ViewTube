import "./navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Login from "../Login/Login";

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userPic, setUserPic] = useState(
    "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
  );
  const [navbarModel, setNavbarModel] = useState(false);
  const [login, setLogin] = useState(false);
  const [navbarLoginView, setNavbarLoginView] = useState(false);

  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/user/1");
    setNavbarModel(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setNavbarModel((prev) => !prev);
  };

  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  const setLoginFunc = () => {
    setLogin(false);
    setNavbarLoginView(false);
  };

  const onClickOfPopUpOption = (button) => {
    if (button === "login") {
      setNavbarModel(false);
      setNavbarLoginView(true);
      setLogin(true);
    } else {
    }
  };

  return (
    <div className={navbarLoginView ? "navbarFull" : "navbar"}>
      <div className="navbar-left">
        <div className="navbarHamburger" onClick={sideNavbarFunc}>
          <MenuIcon sx={{ fontSize: "30px" }} />
        </div>
        <Link to={"/"} className="navbarHome">
          <PlayCircleIcon sx={{ fontSize: "30px" }} />
          <div className="navbarViewTube">ViewTube</div>
        </Link>
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
        <Link to={"/322/upload"}>
          <VideoCallIcon sx={{ fontSize: "30px" }} />
        </Link>

        <NotificationsActiveRoundedIcon sx={{ fontSize: "30px" }} />

        <img src={userPic} className="userPic" onClick={handleClick} />
        {navbarModel && (
          <div className="navbarModel">
            <div className="navbarModelOption" onClick={handleProfile}>
              Profile
            </div>
            <div
              className="navbarModelOption"
              onClick={() => onClickOfPopUpOption("login")}
            >
              Login
            </div>
            <div
              className="navbarModelOption"
              onClick={() => onClickOfPopUpOption("logout")}
            >
              Logout
            </div>
          </div>
        )}
      </div>
      {login && <Login setLoginFunc={setLoginFunc} />}
    </div>
  );
};

export default Navbar;
