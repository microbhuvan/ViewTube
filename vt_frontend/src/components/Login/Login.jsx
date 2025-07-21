import "./login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Login = ({ setLoginFunc }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  console.log(userName);
  console.log(password);

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
              placeholder="Username"
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
          <div className="btn">Login</div>
          <Link to={"/signup"} className="btn" onClick={() => setLoginFunc()}>
            SignUp
          </Link>
          <div className="btn" onClick={() => setLoginFunc()}>
            Cancel
          </div>
        </div>
        <div className="note">If New User then Signup</div>
      </div>{" "}
    </div>
  );
};

export default Login;
