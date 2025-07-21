import "./login.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const Login = ({ setLoginFunc }) => {
  return (
    <div className="login">
      <div className="loginCard">
        <div className="loginTitle">
          <div className="loginTitleLogo">
            <PlayCircleIcon sx={{ fontSize: "44px" }} />
          </div>
          <div className="uploadVideoTitleText"> Login</div>
        </div>
        <div className="loginCredentials">
          <div className="userNameLogin">
            <input
              type="text"
              placeholder="Username"
              className="userNameLoginUsername"
            ></input>
          </div>
          <div className="userNameLogin">
            <input
              type="password"
              placeholder="Password"
              className="userNameLoginUsername"
            ></input>
          </div>
        </div>
        <div className="loginButtons">
          <div className="btn">Login</div>
          <div className="btn">SignUp</div>
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
