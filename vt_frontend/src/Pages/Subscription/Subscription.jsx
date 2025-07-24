import "./subscription.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import { Link } from "react-router-dom";

const Subscription = () => {
  const [profileChannelsData, setProfileChannelsData] = useState(null);
  const getProfiles = async () => {
    await axios
      .get(`${BASE_URL}/auth/users/getprofiles`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res?.data?.userArray?.subscribedTo);
        setProfileChannelsData(res?.data?.userArray?.subscribedTo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className="subscriptionPage">
      <div className="subscriptionPageHeader">Subscribed Profiles</div>
      <div className="subscriptionPageProfileContainer">
        {profileChannelsData?.map((profile, index) => {
          return (
            <Link
              to={`/user/${profile?._id}`}
              className="subscriptionPageProfile"
              key={index}
            >
              <div className="subscriptionPageProfilePicContainer">
                <img
                  src={profile?.profilePic}
                  className="subscriptionPageProfilePic"
                  alt="profile image"
                ></img>
              </div>

              <div className="subscriptionPageProfileAbout">
                <div className="subscriptionPageProfileName">
                  {profile?.userName}
                </div>
                <div className="subscriptionPageProfileInfo">
                  {`${profile?.subscribers?.length} subscribers`}
                </div>
                <div className="subscriptionPageProfileDescription">
                  {profile?.about}
                </div>
              </div>
            </Link>
          );
        })}
        {/**/}
      </div>
    </div>
  );
};

export default Subscription;
