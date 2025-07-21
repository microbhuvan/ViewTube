import "./signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const SignUp = () => {
  const [signUpField, setSignUpField] = useState({
    userName: "",
    password: "",
    emailId: "",
    about: "",
  });

  console.log(signUpField);

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

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
              className="inputButtons"
            ></input>
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
