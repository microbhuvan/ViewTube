import "./homepage.css";
import { Link } from "react-router-dom";

const HomePage = ({ sideNavbar }) => {
  const options = [
    "all",
    "music",
    "cricket",
    "movies",
    "all",
    "music",
    "cricket",
    "movies",
    "all",
    "music",
    "cricket",
    "movies",
    "all",
    "music",
    "cricket",
    "movies",
    "all",
    "music",
    "cricket",
    "movies",
  ];
  return (
    <div className={sideNavbar ? "homePage" : "homePageFull"}>
      {/**homepage scroll*/}
      <div className="homePageOptions">
        {options.map((option, index) => (
          <div key={index} className="homePageOptionElements">
            {option}
          </div>
        ))}
      </div>

      {/**homepage MAIN*/}
      <div className="homeMainPage">
        <div className="vt-videoContainer">
          <div className="vt-video">
            <Link to={"/watch/:id"} className="vt-thumbnailBox">
              <img
                src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
                alt="thumbnail"
                className="vt-thumbnail"
              />
              <div className="vt-thumbnailTime">18:50</div>
            </Link>
            <div className="vt-titleBox">
              <Link to={"/user/1"} className="vt-titleBoxProfile">
                <img
                  src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  alt="profile link"
                  className="vt-titleBoxProflePic"
                />
              </Link>

              <div className="vt-titleBoxTitle">
                <div className="vt-videoTitle">
                  smurfs-movie review a asfsafsffeffsefsefefefa
                </div>
                <Link to={"/user/1"} className="vt-videoChannelName">
                  jeremy jahans
                </Link>
                <div className="vt-videoViews">3 views</div>
              </div>
            </div>
          </div>
          {/** */}
          <div className="vt-video">
            <div className="vt-thumbnailBox">
              <img
                src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
                alt="thumbnail"
                className="vt-thumbnail"
              />
              <div className="vt-thumbnailTime">18:50</div>
            </div>
            <div className="vt-titleBox">
              <div className="vt-titleBoxProfile">
                <img
                  src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  alt="profile link"
                  className="vt-titleBoxProflePic"
                />
              </div>
              <div className="vt-titleBoxTitle">
                <div className="vt-videoTitle">smurfs-movie review</div>
                <div className="vt-videoChannelName">jeremy jahans</div>
                <div className="vt-videoViews">3 views</div>
              </div>
            </div>
          </div>
          <div className="vt-video">
            <div className="vt-thumbnailBox">
              <img
                src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
                alt="thumbnail"
                className="vt-thumbnail"
              />
              <div className="vt-thumbnailTime">18:50</div>
            </div>
            <div className="vt-titleBox">
              <div className="vt-titleBoxProfile">
                <img
                  src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  alt="profile link"
                  className="vt-titleBoxProflePic"
                />
              </div>
              <div className="vt-titleBoxTitle">
                <div className="vt-videoTitle">smurfs-movie review</div>
                <div className="vt-videoChannelName">jeremy jahans</div>
                <div className="vt-videoViews">3 views</div>
              </div>
            </div>
          </div>
          <div className="vt-video">
            <div className="vt-thumbnailBox">
              <img
                src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
                alt="thumbnail"
                className="vt-thumbnail"
              />
              <div className="vt-thumbnailTime">18:50</div>
            </div>
            <div className="vt-titleBox">
              <div className="vt-titleBoxProfile">
                <img
                  src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  alt="profile link"
                  className="vt-titleBoxProflePic"
                />
              </div>
              <div className="vt-titleBoxTitle">
                <div className="vt-videoTitle">smurfs-movie review</div>
                <div className="vt-videoChannelName">jeremy jahans</div>
                <div className="vt-videoViews">3 views</div>
              </div>
            </div>
          </div>
          <div className="vt-video">
            <div className="vt-thumbnailBox">
              <img
                src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
                alt="thumbnail"
                className="vt-thumbnail"
              />
              <div className="vt-thumbnailTime">18:50</div>
            </div>
            <div className="vt-titleBox">
              <div className="vt-titleBoxProfile">
                <img
                  src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  alt="profile link"
                  className="vt-titleBoxProflePic"
                />
              </div>

              <div className="vt-titleBoxTitle">
                <div className="vt-videoTitle">smurfs-movie review</div>
                <div className="vt-videoChannelName">jeremy jahans</div>
                <div className="vt-videoViews">3 views</div>
              </div>
            </div>
          </div>
          <div className="vt-video">
            <div className="vt-thumbnailBox">
              <img
                src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
                alt="thumbnail"
                className="vt-thumbnail"
              />
              <div className="vt-thumbnailTime">18:50</div>
            </div>
            <div className="vt-titleBox">
              <div className="vt-titleBoxProfile">
                <img
                  src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  alt="profile link"
                  className="vt-titleBoxProflePic"
                />
              </div>

              <div className="vt-titleBoxTitle">
                <div className="vt-videoTitle">smurfs-movie review</div>
                <div className="vt-videoChannelName">jeremy jahans</div>
                <div className="vt-videoViews">3 views</div>
              </div>
            </div>
          </div>
          <div className="vt-video">
            <div className="vt-thumbnailBox">
              <img
                src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
                alt="thumbnail"
                className="vt-thumbnail"
              />
              <div className="vt-thumbnailTime">18:50</div>
            </div>
            <div className="vt-titleBox">
              <div className="vt-titleBoxProfile">
                <img
                  src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  alt="profile link"
                  className="vt-titleBoxProflePic"
                />
              </div>

              <div className="vt-titleBoxTitle">
                <div className="vt-videoTitle">smurfs-movie review</div>
                <div className="vt-videoChannelName">jeremy jahans</div>
                <div className="vt-videoViews">3 views</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
