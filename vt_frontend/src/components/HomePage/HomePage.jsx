import "./homepage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const HomePage = ({ sideNavbar }) => {
  //const options = ["all", "music"];

  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_URL + "/api/allVideo", { withCredentials: true })
      .then((res) => {
        console.log(res.data.videos);
        setVideos(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={sideNavbar ? "homePage" : "homePageFull"}>
      {/**homepage scroll*/}
      {/* <div className="homePageOptions">
        {options.map((option, index) => (
          <div key={index} className="homePageOptionElements">
            {option}
          </div>
        ))}
      </div> */}

      {/**homepage MAIN*/}
      <div className="homeMainPage">
        <div className="vt-videoContainer">
          {videos?.map((video, index) => {
            return (
              <div className="vt-video" key={index}>
                <Link to={`/watch/${video._id}`} className="vt-thumbnailBox">
                  <img
                    src={video?.thumbnail}
                    alt="thumbnail"
                    className="vt-thumbnail"
                  />
                  <div className="vt-thumbnailTime">{video?.videoLength}</div>
                </Link>
                <div className="vt-titleBox">
                  <Link
                    to={`/user/${video?.user?._id}`}
                    className="vt-titleBoxProfile"
                  >
                    <img
                      src={video?.user?.profilePic}
                      alt="profile link"
                      className="vt-titleBoxProflePic"
                    />
                  </Link>

                  <div className="vt-titleBoxTitle">
                    <div className="vt-videoTitle">{video?.title}</div>
                    <Link
                      to={`/user/${video?.user?._id}`}
                      className="vt-videoChannelName"
                    >
                      {video?.user?.userName}
                    </Link>
                    <div className="vt-videoViews">{`${video?.views} views`}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {/** */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
