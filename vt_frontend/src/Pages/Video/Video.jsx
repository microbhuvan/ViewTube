import "./video.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Video = () => {
  const [message, setMessage] = useState(""); //for comments
  console.log(message);

  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState(null);

  const { id } = useParams();
  console.log(id); //videoid

  const fetchVideoById = async () => {
    await axios
      .get(BASE_URL + `/api/getvideo/${id}`)
      .then((res) => {
        console.log(res);
        setVideoData(res?.data?.video);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCommentByVideoId = async (req, res) => {
    await axios
      .get(BASE_URL + `/commentApi/comment/${id}`)
      .then((res) => {
        console.log(res?.data?.comments);
        setComments(res?.data?.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComment = async () => {
    try {
      if (localStorage.getItem("userId") === null) {
        setMessage("");
        throw new Error();
      }

      const body = {
        video: id,
        message: message,
      };
      await axios
        .post(`${BASE_URL}/commentApi/comment`, body, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          const newComment = res?.data?.comment;
          setComments([newComment, ...comments]);
          setMessage("");
          toast.success("comment added successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("error");
        });
    } catch (err) {
      console.log(err);
      toast.error("login to continue");
    }
  };

  const incrementView = async () => {
    await axios
      .put(`${BASE_URL}/api/increment-views/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [viewCounted, setViewCounted] = useState(false);
  const handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    setWatchedSeconds(currentTime);

    if (!viewCounted) {
      const duration = e.target.duration;
      if (
        currentTime >= 30 ||
        (duration <= 30 && currentTime >= duration * 0.5)
      ) {
        incrementView();
        setViewCounted(true);
      }
    }
  };

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const handleLike = async () => {
    if (!localStorage.getItem("userId")) {
      toast.error("login to continue");
      return;
    }
    await axios
      .post(
        `${BASE_URL}/api/video/${id}/toggle-like`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setVideoData((prev) => ({
          ...prev,
          like: res?.data?.likes,
          dislike: res?.data?.dislikes,
        }));
        setIsLiked((prev) => !prev);

        if (isDisliked) {
          setIsDisliked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDislike = async () => {
    if (!localStorage.getItem("userId")) {
      toast.error("login to continue");
      return;
    }
    await axios
      .post(
        `${BASE_URL}/api/video/${id}/toggle-dislike`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setVideoData((prev) => ({
          ...prev,
          like: res?.data?.likes,
          dislike: res?.data?.dislikes,
        }));
        setIsDisliked((prev) => !prev);

        if (isLiked) {
          setIsLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (videoData?.likedBy?.includes(userId)) {
      setIsLiked(true);
    }
    if (videoData?.dislikedBy?.includes(userId)) {
      setIsDisliked(true);
    }
  }, [id, videoData]);

  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
  }, [id]);

  console.log(videoData);
  console.log(videoData?.videoLink);

  return (
    <div className="videoPage">
      <div className="videoSection">
        <div className="videoContainer">
          {videoData && (
            <video
              width="400"
              controls
              autoPlay
              className="video"
              onTimeUpdate={handleTimeUpdate}
            >
              <source src={videoData?.videoLink} type="video/mp4"></source>
              <source src={videoData?.videoLink} type="video/webm"></source>
              Your browser doesnt support video tag
            </video>
          )}
        </div>
        <div className="videoAbout">
          <div className="videoTitle">{videoData?.title}</div>
          <div className="videoProfileBlock">
            <div className="videoProfileBlockLeft">
              <Link
                to={`/user/${videoData?.user?._id}`}
                className="videoProfileBlockLeftPicContainer"
              >
                <img
                  src={videoData?.user?.profilePic}
                  className="videoProfileBlockLeftPic"
                ></img>
              </Link>
              <div className="vtVideoSubView">
                <Link
                  to={`/user/${videoData?.user?._id}`}
                  className="vtPostProfileName"
                >
                  {videoData?.user?.userName}
                </Link>
                <div className="vtPostProfileSubs">34 subscribers</div>
              </div>
              <div className="subscribeButton">Subscibe</div>
            </div>

            {/**rightblock PROFILE */}
            <div className="vtVideoLikeBlock">
              <div className="likeIcon" onClick={handleLike}>
                <ThumbUpOffAltIcon className={isLiked ? "likeButton" : ""} />
                <div className="vtLikeNumber">{videoData?.like}</div>
              </div>
              <div className="dash">|</div>
              <div className="dislikeIcon" onClick={handleDislike}>
                <ThumbDownOffAltIcon
                  className={isDisliked ? "dislikeButton" : ""}
                />
              </div>
            </div>
          </div>
          <div className="videoAboutDescriptionBlock">
            <div className="uploadDate">
              <div>{`${videoData?.views} views`}</div>
              <div>{videoData?.createdAt.slice(0, 10)}</div>
            </div>
            <div className="videoAboutDescription">
              {videoData?.description}
            </div>
          </div>
        </div>
        <div className="videoCommentSection">
          <div className="videCommentSectionTitle">{`${comments?.length} Comments`}</div>
          <div className="videoSelfComment">
            <img
              src={videoData?.user?.profilePic}
              alt="profile image"
              className="videoSelfCommentProfile"
            ></img>
            <div className="addComment">
              <input
                type="text"
                className="addCommentInput"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a comment"
              />
              <div className="cancelSubmitComment">
                <div
                  className="cancelComment commentButton"
                  onClick={() => setMessage("")}
                >
                  Cancel
                </div>
                <div
                  className="commentComment commentButton"
                  onClick={handleComment}
                >
                  Comment
                </div>
              </div>
            </div>
          </div>
          <div className="othersCommentsSection">
            {comments?.map((comment, index) => {
              return (
                <div className="videoOtherComment" key={index}>
                  <img
                    src={comment?.user?.profilePic}
                    alt="profile image"
                    className="videoSelfCommentProfile"
                  ></img>
                  <div className="othersCommentsBlock">
                    <div className="othersCommentsBlockHeader">
                      <div className="profileNameComment">
                        {comment?.user?.userName}
                      </div>
                      <div className="commentTimings">
                        {comment?.createdAt.slice(0, 10)}
                      </div>
                    </div>
                    <div className="othersCommentBlockComment">
                      {comment?.message}
                    </div>
                  </div>
                </div>
              );
            })}
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
      <ToastContainer />
    </div>
  );
};

export default Video;
