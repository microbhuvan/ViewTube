import "./videoupload.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { LinearProgress } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { BASE_URL } from "../../utils/constant";

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
  const [progressBar, setProgressBar] = useState(false);
  const navigate = useNavigate();

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
      const url = res.data.secure_url;
      let val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({ ...inputField, [val]: url });

      console.log(res);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  console.log("output before handle input func", inputField);
  console.log("before handleupload function");
  const handleUploadFunc = async () => {
    console.log("indside handle upload function");
    setProgressBar(true);
    console.log("before printing input field");
    console.log("input field", inputField);
    await axios
      .post(`${BASE_URL}/api/video`, inputField, { withCredentials: true })
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
        setProgressBar(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error);
        toast.error("fill all the fields correctly");
        setProgressBar(false);
      });
  };

  useEffect(() => {
    let isLogin = localStorage.getItem("userId");
    if (isLogin == null) {
      navigate("/");
    }
  }, []);

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
            Thumbnail{" "}
            <input
              type="file"
              accept="image/*"
              className="inputButtons"
              onChange={(e) => uploadField(e, "image")}
            ></input>
          </div>
          {loader && <CircularProgress disableShrink />}
          <div className="uploadBtnTV">
            Video
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              className="inputButtons"
              onChange={(e) => uploadField(e, "video")}
            ></input>
          </div>
          {loader && <CircularProgress disableShrink />}
        </div>
        <div className="uploadBtns">
          <div
            className="uploadBtn-form"
            onClick={() => {
              console.log("home button");
              navigate("/");
            }}
          >
            Home
          </div>
          <button
            className="uploadBtn-form"
            onClick={() => {
              console.log("UPLOAD BUTTON TEST");
              handleUploadFunc();
            }}
          >
            Upload
          </button>
        </div>
      </div>
      {progressBar && <LinearProgress />}
      <ToastContainer />
    </div>
  );
};

export default VideoUpload;
