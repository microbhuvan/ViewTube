import "./signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

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

  const uploadImage = async (e) => {
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
        }/image/upload`,
        data
      );
      const imageUrl = res.data.url;
      setUploadImageUrl(imageUrl);
      setSignUpField({ ...signUpField, profilePic: imageUrl });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
              placeholder="Username"
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
          </div>
        </div>
        <div className="signupButtons">
          <div className="btn">SignUp</div>
          <Link to={"/"} className="btn">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
