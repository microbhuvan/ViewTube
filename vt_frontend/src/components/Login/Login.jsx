import "./login.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { Link } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { toast, ToastContainer } from "react-toastify";
import { LinearProgress } from "@mui/material";

const Login = ({ setLoginFunc }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [progressBar, setProgressBar] = useState(false);

  const handleLogin = async () => {
    setProgressBar(true);
    await axios
      .post(
        `${BASE_URL}/auth/login`,
        {
          userName: userName,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", res?.data?.user);
        localStorage.setItem("userId", res?.data?.user?._id);
        localStorage.setItem("userProfilePic", res?.data?.user?.profilePic);

        setProgressBar(false);
        toast.success(res?.data?.message);

        setTimeout(() => {
          setLoginFunc();
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setProgressBar(false);
        toast.error(err?.response?.data?.error);
      });
  };

  return (
    <div className="login">
      <div className="loginCard">
        <div className="loginTitle">
          <div className="loginTitleLogo">
            <PlayCircleIcon sx={{ fontSize: "44px" }} />
          </div>
          <div className="loginTitle"> Login</div>
        </div>
        <div className="loginCredentials">
          <div className="userNameLogin">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username / Channel name"
              className="userNameLoginUsername"
            ></input>
          </div>
          <div className="userNameLogin">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="userNameLoginUsername"
            ></input>
          </div>
        </div>
        <div className="loginButtons">
          <div className="btn" onClick={handleLogin}>
            Login
          </div>
          <Link to={"/signup"} className="btn" onClick={() => setLoginFunc()}>
            SignUp
          </Link>
          <div className="btn" onClick={() => setLoginFunc()}>
            Cancel
          </div>
        </div>
        <div className="note">If New User then Signup</div>
      </div>{" "}
      {progressBar && <LinearProgress />}
      <ToastContainer />
    </div>
  );
};

export default Login;
