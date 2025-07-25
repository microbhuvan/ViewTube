import "./profile.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [user, setUser] = useState(null);

  const { id } = useParams();

  const fetchProfileData = async (req, res) => {
    await axios.get(`${BASE_URL}/auth/user/${id}`).then((res) => {
      console.log(res);
      setUser(res?.data?.user);
    });
  };

  const fetchProfileVideoData = async () => {
    await axios
      .get(BASE_URL + `/api/${id}/getuservideo`)
      .then((res) => {
        setProfileData(res?.data?.video);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isProfileSubscribed, setIsProfileSubscribed] = useState(false);

  const handleSubscribeToggle = async () => {
    if (!localStorage.getItem("userId")) {
      toast.error("login to continue");
      return;
    }

    const endpoint = isProfileSubscribed ? "unsubscribe" : "subscribe";
    await axios
      .post(
        `${BASE_URL}/auth/users/${endpoint}/profile/${id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setIsProfileSubscribed((prev) => !prev);
        toast.success(
          isProfileSubscribed
            ? "Unsubscribed successfully"
            : "Subscribed successfully"
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!profileData || profileData.length === 0) {
      setIsProfileSubscribed(false);
      return;
    }

    if (profileData?.[0]?.user?.subscribers?.includes(userId)) {
      setIsProfileSubscribed(true);
    } else {
      setIsProfileSubscribed(false);
    }
  }, [id, profileData, user]);

  useEffect(() => {
    fetchProfileData();
    fetchProfileVideoData();
  }, [id]);

  return (
    <div className="profilePage">
      <div className="profileTopSection">
        <div className="profileTopSectionProfile">
          <img
            src={user?.profilePic}
            className="profileTopSectionImg"
            alt="profile image"
          ></img>
        </div>
        <div className="profileTopSectionAbout">
          <div className="profileTopSectionTitleBlock">
            <div className="profileTopSectionAboutName">{user?.userName}</div>
            <div
              className={
                isProfileSubscribed
                  ? "profileActivateSubscribeButton"
                  : "profileSubscribeButton"
              }
              onClick={handleSubscribeToggle}
            >
              {isProfileSubscribed ? "Unsubscribe" : "Subscribe"}
            </div>
          </div>

          <div className="profileTopSectionInfo">{`${user?.subscribers?.length} subscribers . ${profileData?.length} vidoes`}</div>
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
                  <div className="profileVideoThumbnailTime">
                    {profileVideo?.videoLength}
                  </div>
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
      <ToastContainer />
    </div>
  );
};

export default Profile;
