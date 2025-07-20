import "./profile.css";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Profile = () => {
  return (
    <div className="profilePage">
      <div className="profileTopSection">
        <div className="profileTopSectionProfile">
          <img
            src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
            className="profileTopSectionImg"
          ></img>
        </div>
        <div className="profileTopSectionAbout">
          <div className="profileTopSectionAboutName">Channel Name</div>
          <div className="profileTopSectionInfo">Username . 4 videos</div>
          <div className="profileTopSectionDescription">
            About section asfjjdsfjif iosdjf oifiodf sidf f isjd foijf sifj
            sdiofj f io asoifj osf iewfiof xf saoiedfjsf iwefj sfiojs f
          </div>
        </div>
      </div>

      <div className="profileBottomSection">
        <div className="profileVideoSectionTitle">
          Videos <PlayArrowIcon />
        </div>
        <div className="profileVideoContainer">
          <Link to={"/watch/1"} className="profileVideo">
            <div className="profileVideoThumbnail">
              <img
                src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
                alt="thumbnail"
                className="profileVideoThumbnailImg"
              ></img>
            </div>
            <div className="profileVideoDetail">
              <div className="profileVideoDetailTitle">
                title of video dfsaf asdfsdf asdfasf asdfsdf asfasfdsf sdfa asdf
                aasdf
              </div>
              <div className="profileVideoDetailInfo">views time</div>
            </div>
          </Link>
          {/* */}
          <div className="profileVideo">
            <div className="profileVideoThumbnail">
              <img
                src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
                alt="thumbnail"
                className="profileVideoThumbnailImg"
              ></img>
            </div>
            <Link to={"/watch/1"} className="profileVideoDetail">
              <div className="profileVideoDetailTitle">
                title of video dfsaf asdfsdf asdfasf asdfsdf asfasfdsf sdfa asdf
                aasdf
              </div>
              <div className="profileVideoDetailInfo">views time</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
