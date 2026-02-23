import { useEffect, useState } from "react";
import "./LoginPage.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login, loginSelector } from "../../slices/login/loginSlice";
import { useNavigate } from "react-router-dom";
import { setActiveMenu } from "../../slices/menu/menuSlice";
import { views } from "../../slices/menu/menuTypes";

const LoginPage = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useAppSelector(loginSelector);
  // console.log("isLoggedIn: ", isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin/conversations");
      dispatch(setActiveMenu(views.CONVERSATIONS));
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-input-wrapper">
      <div className="login-input-container">
        <div className="login-input-title">
          <h1>Login</h1>
          <h3>Welcome to RespLoop.ai</h3>
        </div>
        <div className="login-email-input-div">
          <div className="login-input-box-wrapper">
            <input
              className="login-email-input"
              type="text"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
              placeholder="example@mail.com"
            />
            <input
              className="login-password-input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
            />
          </div>
          <button
            className="login-button"
            onClick={() => {
              dispatch(login({ emailId, password }));
            }}
          >
            Login
          </button>
          {isLoggedIn === false && (
            <div className="login-error-msg">Wrong email or passwprd.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
