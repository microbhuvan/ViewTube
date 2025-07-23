import "./profile.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [user, setUser] = useState(null);

  const { id } = useParams();

  const fetchProfileData = async () => {
    await axios
      .get(BASE_URL + `/api/${id}/getuservideo`)
      .then((res) => {
        console.log(res?.data?.video);
        setProfileData(res?.data?.video);
        setUser(res?.data?.video[0]?.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="profilePage">
      <div className="profileTopSection">
        <div className="profileTopSectionProfile">
          <img src={user?.profilePic} className="profileTopSectionImg"></img>
        </div>
        <div className="profileTopSectionAbout">
          <div className="profileTopSectionAboutName">{user?.userName}</div>
          <div className="profileTopSectionInfo">{`subscribers . ${profileData?.length} vidoes`}</div>
          <div className="profileTopSectionDescription">{user?.about}</div>
        </div>
      </div>

      <div className="profileBottomSection">
        <div className="profileVideoSectionTitle">
          Videos <PlayArrowIcon />
        </div>
        <div className="profileVideoContainer">
          {profileData?.map((profileVideo, index) => {
            return (
              <Link
                to={`/watch/${profileVideo?._id}`}
                className="profileVideo"
                key={index}
              >
                <div className="profileVideoThumbnail">
                  <img
                    src={profileVideo?.thumbnail}
                    alt="thumbnail"
                    className="profileVideoThumbnailImg"
                  ></img>
                </div>
                <div className="profileVideoDetail">
                  <div className="profileVideoDetailTitle">
                    {profileVideo?.title}
                  </div>
                  <div className="profileVideoDetailInfo">
                    {`created att ${profileVideo?.createdAt.slice(0, 10)}`}
                  </div>
                </div>
              </Link>
            );
          })}
          {/* */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
