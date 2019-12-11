import React from "react";
import "./Login.css";

const Login = props => {
  return (
    <div className="login">
      <div className="login-title">Welcome!</div>
      <div className="login-input-area">
        <div className="username">
          <div className="username-label">Username:</div>
          <input type="text" className="username-email-input" />
        </div>
        <div className="password">
          <div className="password-label">Password:</div>
          <input type="password" className="password-input" />
        </div>
        <div className="login-btn" onClick={() => props.login(document.querySelector(".username-email-input").value)}>
          Login
        </div>
        <div className="btn-separator">OR</div>
        <div className="switch-register-btn" onClick={props.register}>
          Create an Account
        </div>
      </div>
    </div>
  );
};

export default Login;
