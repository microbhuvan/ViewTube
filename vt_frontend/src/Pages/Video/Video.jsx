import "./video.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
const Video = () => {
  return (
    <div className="videoPage">
      <div className="videoSection">
        <div className="videoContainer">
          <video width="400" controls autoPlay className="video">
            <source src={""} type="video/mp4"></source>
            <source src={""} type="video/webm"></source>
            Your browser doesnt support video tag
          </video>
        </div>
        <div className="videoAbout">
          <div className="videoTitle">
            The Last Colour Negative Motion Picture Film In The World: Kodak
            Vision 3
          </div>
          <div className="videoProfileBlock">
            <div className="videoProfileBlockLeft">
              <div className="videoProfileBlockLeftPicContainer">
                <img
                  src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                  alt="profile pic"
                  className="videoProfileBlockLeftPic"
                ></img>
              </div>
              <div className="vtVideoSubView">
                <div className="vtPostProfileName">User1</div>
                <div className="vtPostProfileSubs">34 subscribers</div>
              </div>
              <div className="subscribeButton">Subscibe</div>
            </div>

            {/**rightblock PROFILE */}
            <div className="vtVideoLikeBlock">
              <div className="likeIcon">
                <ThumbUpOffAltIcon />
                <div className="vtLikeNumber">34</div>
              </div>
              <div className="dislikeIcon">
                <ThumbDownOffAltIcon />
              </div>
            </div>
          </div>
          <div className="videoAboutDescriptionBlock">
            <div className="uploadDate">22-10-24</div>
            <div className="videoAboutDescription">About the video</div>
          </div>
        </div>
        <div className="videoCommentSection">
          <div className="videCommentSectionTitle">2 Comments</div>
          <div className="videoSelfComment">
            <img
              src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
              alt="profile image"
              className="videoSelfCommentProfile"
            ></img>
            <div className="addComment">
              <input
                type="text"
                className="addCommentInput"
                placeholder="Add a comment"
              />
              <div className="cancelSubmitComment">
                <div className="cancelComment commentButton">Cancel</div>
                <div className="commentComment commentButton">Comment</div>
              </div>
            </div>
          </div>
          <div className="othersCommentsSection">
            <div className="videoOtherComment">
              <img
                src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                alt="profile image"
                className="videoSelfCommentProfile"
              ></img>
              <div className="othersCommentsBlock">
                <div className="othersCommentsBlockHeader">
                  <div className="profileNameComment">profile name </div>
                  <div className="commentTimings">22-09-24</div>
                </div>
                <div className="othersCommentBlockComment">
                  hi bro good video
                </div>
              </div>
            </div>
            {/** */}
            <div className="videoOtherComment">
              <img
                src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                alt="profile image"
                className="videoSelfCommentProfile"
              ></img>
              <div className="othersCommentsBlock">
                <div className="othersCommentsBlockHeader">
                  <div className="profileNameComment">profile name </div>
                  <div className="commentTimings">22-09-24</div>
                </div>
                <div className="othersCommentBlockComment">
                  hi bro good video
                </div>
              </div>
            </div>
            {/** */}
            <div className="videoOtherComment">
              <img
                src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                alt="profile image"
                className="videoSelfCommentProfile"
              ></img>
              <div className="othersCommentsBlock">
                <div className="othersCommentsBlockHeader">
                  <div className="profileNameComment">profile name </div>
                  <div className="commentTimings">22-09-24</div>
                </div>
                <div className="othersCommentBlockComment">
                  hi bro good video
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="videoSuggetion">
        <div className="videoSuggetionBlock">
          <div className="videoSuggetionThumbnail">
            <img
              src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
              alt="thumbnail"
              className="videoSuggetionThumbnailImg"
            ></img>
          </div>
          <div className="videoSuggetionAbout">
            <div className="videoSuggetionAboutTitle">
              the t20 world cup final ind vs sa watch now
            </div>
            <div className="videoSuggetionAboutProfile">cricket t20</div>
            <div className="videoSuggetionAboutViews">30 views . 1 day ago</div>
          </div>
        </div>
        {/**/}
        <div className="videoSuggetionBlock">
          <div className="videoSuggetionThumbnail">
            <img
              src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
              alt="thumbnail"
              className="videoSuggetionThumbnailImg"
            ></img>
          </div>
          <div className="videoSuggetionAbout">
            <div className="videoSuggetionAboutTitle">
              the t20 world cup final ind vs sa watch now
            </div>
            <div className="videoSuggetionAboutProfile">cricket t20</div>
            <div className="videoSuggetionAboutViews">30 views . 1 day ago</div>
          </div>
        </div>
        {/**/}
        <div className="videoSuggetionBlock">
          <div className="videoSuggetionThumbnail">
            <img
              src="https://cdn.neowin.com/news/images/uploaded/2024/08/1723555868_youtube-logo.jpg"
              alt="thumbnail"
              className="videoSuggetionThumbnailImg"
            ></img>
          </div>
          <div className="videoSuggetionAbout">
            <div className="videoSuggetionAboutTitle">
              the t20 world cup final ind vs sa watch now
            </div>
            <div className="videoSuggetionAboutProfile">cricket t20</div>
            <div className="videoSuggetionAboutViews">30 views . 1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
