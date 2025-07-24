import "./likedvideos.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LikedVideos = () => {
  const [videos, setVideos] = useState(null);

  const loadVideos = async () => {
    await axios
      .get(`${BASE_URL}/api/liked-videos`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setVideos(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="likedVideoPage ">
      <div className="likedVideoHeader">Liked Videos</div>
      <div className="likedVideoContainer">
        {videos?.map((video, index) => {
          return (
            <Link
              to={`/watch/${video?._id}`}
              className="likedVideo"
              key={index}
            >
              <div className="likedVideoThumbnail">
                <img
                  src={video?.thumbnail}
                  alt="thumbnail image"
                  className="likedVideoThumbnailImage"
                ></img>
              </div>
              <div className="likedVideoInfo">
                <div className="likedVideoProfile">
                  <img
                    src={video?.user?.profilePic}
                    alt="profile image"
                    className="profileImage"
                  ></img>
                </div>
                <div className="likedVideoDesc">
                  <div className="likedVideoTitle">{video?.title}</div>
                  <div className="likedVideoProfileName">
                    {video?.user?.userName}
                  </div>
                  <div className="likedVideoViews">{`${video?.views} views`}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LikedVideos;
