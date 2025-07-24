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
      <div className="header">Liked Videos</div>
      <div className="videoContainer">
        {videos?.map((video, index) => {
          return (
            <Link to={`/watch/${video?._id}`} className="video" key={index}>
              <div className="thumbnail">
                <img
                  src={video?.thumbnail}
                  alt="thumbnail image"
                  className="thumbnailImage"
                ></img>
              </div>
              <div className="videoInfo">
                <div className="profile">
                  <img
                    src={video?.user?.profilePic}
                    alt="profile image"
                    className="profileImage"
                  ></img>
                </div>
                <div className="videoDesc">
                  <div className="videoTitle">{video?.title}</div>
                  <div className="profileName">{video?.user?.userName}</div>
                  <div className="videoViews">{`${video?.views} views`}</div>
                </div>
              </div>
            </Link>
          );
        })}
        {/** */}
      </div>
    </div>
  );
};

export default LikedVideos;
