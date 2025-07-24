import "./sidenavbar.css";
import HomeIcon from "@mui/icons-material/Home";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Link } from "react-router-dom";
const SideNavbar = ({ sideNavbar }) => {
  return (
    <div className={sideNavbar ? "home-sideNavbar" : "home-sideNavbarHide"}>
      <div className="home-sideNavbarTop">
        <div className="home-sideNavbarTopOption">
          <HomeIcon />
          <div className="home-sideNavbarTopOptionTitle">Home</div>
        </div>
        <div className="home-sideNavbarTopOption">
          <VideoCallIcon />
          <div className="home-sideNavbarTopOptionTitle">Shorts</div>
        </div>
        <div className="home-sideNavbarTopOption">
          <SubscriptionsIcon />
          <div className="home-sideNavbarTopOptionTitle">Subscriptions</div>
        </div>
      </div>

      {/*this is middle part */}
      <div className="home-sideNavbarMiddle">
        <div className="home-sideNavbarMiddleOption">
          <div className="home-sideNavbarMiddleOptionTitle">Your</div>
          <ArrowForwardIosIcon sx={{ fontSize: "20px" }} />
        </div>
        <div className="home-sideNavbarMiddleOption">
          <RecentActorsIcon />
          <div className="home-sideNavbarMiddleOptionTitle">Your Channel</div>
        </div>
        <div className="home-sideNavbarMiddleOption">
          <HistoryIcon />
          <div className="home-sideNavbarMiddleOptionTitle">History</div>
        </div>
        <div className="home-sideNavbarMiddleOption">
          <PlaylistPlayIcon />
          <div className="home-sideNavbarMiddleOptionTitle">PlayList</div>
        </div>
        <div className="home-sideNavbarMiddleOption">
          <SmartDisplayIcon />
          <div className="home-sideNavbarMiddleOptionTitle">Your Videos</div>
        </div>
        <div className="home-sideNavbarMiddleOption">
          <WatchLaterIcon />
          <div className="home-sideNavbarMiddleOptionTitle">Watch Later</div>
        </div>
        <Link to={"/liked"} className="home-sideNavbarMiddleOption">
          <ThumbUpAltIcon />
          <div className="home-sideNavbarMiddleOptionTitle">Liked Videos</div>
        </Link>
      </div>

      {/*this is bottom part */}
      <div className="home-sideNavbarBottom">
        <div className="home-sideNavbarBottomOption">
          <img src="" alt="image" className="home-sideBarImageLogo" />
          <div className="home-sideNavbarBottomOptionTitle">chname1</div>
        </div>
        <div className="home-sideNavbarBottomOption">
          <img src="" alt="image" className="home-sideBarImageLogo" />
          <div className="home-sideNavbarBottomOptionTitle">chname2</div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
