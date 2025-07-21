import "./videoupload.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const VideoUpload = () => {
  return (
    <div className="videoUpload">
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <div className="uploadVideoTitleLogo">
            <PlayCircleIcon sx={{ fontSize: "44px" }} />
          </div>
          <div className="uploadVideoTitleText"> Upload Video</div>
        </div>
        <div className="uploadForm">
          <input
            type="text"
            placeholder="Title of Video"
            className="uploadFormInput"
          ></input>
          <input
            type="text"
            placeholder="Description"
            className="uploadFormInput"
          ></input>
          <input
            type="text"
            placeholder="Category"
            className="uploadFormInput"
          ></input>
          <div className="uploadBtnTV">
            Thumbnail .{" "}
            <input
              type="file"
              accept="image/*"
              className="inputButtons"
            ></input>
          </div>
          <div className="uploadBtnTV">
            Video .
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              className="inputButtons"
            ></input>
          </div>
        </div>
        <div className="uploadBtns">
          <div className="uploadBtn-form">Upload</div>
          <div className="uploadBtn-form">Home</div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
