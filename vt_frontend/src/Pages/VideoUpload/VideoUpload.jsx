import "./videoupload.css";
import { useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    video: "",
  });

  console.log(inputField);

  const handleOnChangeInput = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
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
            value={inputField.title}
            onChange={(e) => {
              handleOnChangeInput(e, "title");
            }}
            className="uploadFormInput"
          ></input>
          <input
            type="text"
            placeholder="Description"
            value={inputField.description}
            onChange={(e) => {
              handleOnChangeInput(e, "description");
            }}
            className="uploadFormInput"
          ></input>
          <input
            type="text"
            placeholder="Category"
            value={inputField.category}
            onChange={(e) => {
              handleOnChangeInput(e, "category");
            }}
            className="uploadFormInput"
          ></input>
          <div className="uploadBtnTV">
            Thumbnail .{" "}
            <input
              type="file"
              accept="image/*"
              className="inputButtons"
              value={inputField.thumbnail}
              onChange={(e) => {
                handleOnChangeInput(e, "thumbnail");
              }}
            ></input>
          </div>
          <div className="uploadBtnTV">
            Video .
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              className="inputButtons"
              value={inputField.video}
              onChange={(e) => {
                handleOnChangeInput(e, "video");
              }}
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
