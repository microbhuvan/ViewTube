import "./navbar.css";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Login from "../Login/Login";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userPic, setUserPic] = useState(
    "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
  );
  const [navbarModel, setNavbarModel] = useState(false);
  const [login, setLogin] = useState(false);
  const [navbarLoginView, setNavbarLoginView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleProfile = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/user/${userId}`);
      setNavbarModel(false);
    }
  };

  const handleClick = () => {
    setNavbarModel((prev) => !prev);
  };

  const sideNavbarFuncLocal = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  const setLoginFunc = () => {
    setLogin(false);
    setNavbarLoginView(false);
  };

  const setLogoutFunc = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onClickOfPopUpOption = (button) => {
    if (button === "login") {
      setNavbarModel(false);
      setNavbarLoginView(true);
      setLogin(true);
    } else {
      localStorage.clear();
      setLogoutFunc();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 500);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const userProfilePic = localStorage.getItem("userProfilePic");
    setIsLoggedIn(localStorage.getItem("userId") !== null);
    if (userProfilePic) {
      setUserPic(userProfilePic);
    }
  }, []);

  return (
    <div className={navbarLoginView ? "navbarFull" : "navbar"}>
      {/* Left */}
      <div className="navbar-left">
        <div className="navbarHamburger" onClick={sideNavbarFuncLocal}>
          <MenuIcon sx={{ fontSize: "30px" }} />
        </div>
        <Link to="/" className="navbarHome">
          <PlayCircleIcon sx={{ fontSize: "30px" }} />
          <div className="navbarViewTube">ViewTube</div>
        </Link>
      </div>

      {/* Middle */}
      <div className="navbar-middle">
        <div className="navbarSearchBox">
          <input
            type="text"
            placeholder="Search videos or profiles"
            className="navbarInputSearch"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <div className="navbarSearchIconBox" onClick={handleSearch}>
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <button className="themeToggleButton" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <Link to="/322/upload">
          <VideoCallIcon sx={{ fontSize: "30px" }} />
        </Link>
        <img
          src={userPic}
          className="userPic"
          onClick={handleClick}
          alt="User"
        />

        {navbarModel && (
          <div className="navbarModel">
            {isLoggedIn && (
              <div className="navbarModelOption" onClick={handleProfile}>
                Profile
              </div>
            )}
            {isLoggedIn && (
              <div
                className="navbarModelOption"
                onClick={() => onClickOfPopUpOption("logout")}
              >
                Logout
              </div>
            )}
            {!isLoggedIn && (
              <div
                className="navbarModelOption"
                onClick={() => onClickOfPopUpOption("login")}
              >
                Login
              </div>
            )}
          </div>
        )}
      </div>

      {login && <Login setLoginFunc={setLoginFunc} />}
    </div>
  );
};

export default Navbar;
