import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../../utils/constant";
import CircularProgress from "@mui/material/CircularProgress";
import { LinearProgress } from "@mui/material";

const SignUp = () => {
  const [uploadImageUrl, setUploadImageUrl] = useState(
    "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
  );
  const [signUpField, setSignUpField] = useState({
    userName: "",
    password: "",
    emailId: "",
    about: "",
    profilePic: uploadImageUrl,
  });

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  const [loader, setLoader] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("folder", "viewtube");
    //ViewTube
    data.append("upload_preset", "ViewTube");
    try {
      setLoader(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        data
      );

      const imageUrl = res.data.url;
      setLoader(false);
      setUploadImageUrl(imageUrl);
      setSignUpField({ ...signUpField, profilePic: imageUrl });
      console.log(res);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  const [progressBar, setProgressBar] = useState(false);
  const navigate = useNavigate();
  const handleSignUp = async () => {
    setProgressBar(true);
    await axios
      .post(`${BASE_URL}/auth/signup`, signUpField)
      .then((res) => {
        console.log(res);

        setProgressBar(false);
        toast.success("Account created successfully. Please log in.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setProgressBar(false);
        toast.error(err?.response?.data?.error);
      });
  };

  console.log(signUpField);

  return (
    <div className="signup">
      <div className="signupCard">
        <div className="signupTitle">
          <div className="signupTitleLogo">
            <PlayCircleIcon sx={{ fontSize: "44px" }} />
          </div>
          <div className="signupTitle"> Sign Up</div>
        </div>
        <div className="signupCredentials">
          <div className="userNameSignup">
            <input
              type="text"
              placeholder="Username / Channel name"
              value={signUpField.userName}
              onChange={(e) => handleInputField(e, "userName")}
              className="userNameSignupUsername"
            ></input>
          </div>
          <div className="userNameSignup">
            <input
              type="password"
              placeholder="Password"
              value={signUpField.password}
              onChange={(e) => handleInputField(e, "password")}
              className="userNameSignupUsername"
            ></input>
          </div>
          <div className="userNameSignup">
            <input
              type="email"
              placeholder="email@example.com"
              value={signUpField.emailId}
              onChange={(e) => handleInputField(e, "emailId")}
              className="userNameSignupUsername"
            ></input>
          </div>
          <div className="userNameSignup">
            <input
              type="text"
              placeholder="about your channel"
              value={signUpField.about}
              onChange={(e) => handleInputField(e, "about")}
              className="userNameSignupUsername"
            ></input>
          </div>
          <div className="uploadBtnTV">
            Profile Image .{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e)}
              className="inputButtons"
            ></input>
            <img
              src={uploadImageUrl}
              alt="profile pic"
              className="profileImage"
            ></img>
            {loader && <CircularProgress />}
          </div>
        </div>
        <div className="signupButtons">
          <div className="btn" onClick={handleSignUp}>
            SignUp
          </div>
          <Link to={"/"} className="btn">
            Home
          </Link>
        </div>
        {progressBar && <LinearProgress />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
