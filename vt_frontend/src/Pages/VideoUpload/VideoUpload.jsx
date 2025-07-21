import "./videoupload.css";
import { useState } from "react";
import axios from "axios";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    videoLink: "",
  });

  console.log(inputField);
  const [loader, setLoader] = useState(false);
  const handleOnChangeInput = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadField = async (e, type) => {
    setLoader(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("folder", "viewtube");
    //ViewTube
    data.append("upload_preset", "ViewTube");
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/${type}/upload`,
        data
      );
      setLoader(false);
      const url = res.data.url;
      let val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({ ...inputField, [val]: url });

      console.log(res);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  console.log(inputField);

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
              onChange={(e) => uploadField(e, "image")}
            ></input>
          </div>
          <div className="uploadBtnTV">
            Video .
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              className="inputButtons"
              onChange={(e) => uploadField(e, "video")}
            ></input>
            {loader && <CircularProgress disableShrink />}
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
