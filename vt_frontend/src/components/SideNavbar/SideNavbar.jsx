import "./sidenavbar.css";
import HomeIcon from "@mui/icons-material/Home";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SideNavbar = ({ sideNavbar }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleUploadClick = () => {
    if (userId) {
      navigate(`/${userId}/upload`);
    } else {
      toast.error("User not logged in!");
    }
  };

  const handleYourChannelClick = () => {
    if (userId) {
      navigate(`/user/${userId}`);
    } else {
      toast.error("User not logged in!");
    }
  };

  const handleLikedClick = () => {
    if (userId) {
      navigate(`/liked/${userId}`);
    } else {
      toast.error("User not logged in!");
    }
  };

  const handleSubscribedClick = () => {
    if (userId) {
      navigate(`/subscribed/${userId}`);
    } else {
      toast.error("User not logged in!");
    }
  };

  return (
    <div className={sideNavbar ? "home-sideNavbar" : "home-sideNavbarHide"}>
      <div className="home-sideNavbarTop">
        {/* <div className="home-sideNavbarTopOption" onClick={handleHomeClick}>
          <HomeIcon />
          <div className="home-sideNavbarTopOptionTitle">Home</div>
        </div> */}
        <div className="home-sideNavbarTopOption" onClick={handleUploadClick}>
          <VideoCallIcon />
          <div className="home-sideNavbarTopOptionTitle">Video Upload</div>
        </div>
        <div
          className="home-sideNavbarTopOption"
          onClick={handleSubscribedClick}
        >
          <SubscriptionsIcon />
          <div className="home-sideNavbarTopOptionTitle">Subscriptions</div>
        </div>
      </div>

      {/* Middle */}
      <div className="home-sideNavbarMiddle">
        {/* <div className="home-sideNavbarMiddleOption">
          <div className="home-sideNavbarMiddleOptionTitle">Your</div>
          <ArrowForwardIosIcon sx={{ fontSize: "20px" }} />
        </div> */}
        <div
          className="home-sideNavbarMiddleOption"
          onClick={handleYourChannelClick}
        >
          <RecentActorsIcon />
          <div className="home-sideNavbarMiddleOptionTitle">Your channel</div>
        </div>
        <div className="home-sideNavbarMiddleOption" onClick={handleLikedClick}>
          <ThumbUpAltIcon />
          <div className="home-sideNavbarMiddleOptionTitle">Liked Videos</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SideNavbar;
