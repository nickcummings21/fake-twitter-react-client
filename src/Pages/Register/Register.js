import React from "react";
import "./Register.css";

const Register = props => {
  return (
    <div className="register">
      <div className="register-title">Create an Account</div>
      <div className="register-input-area">
        <div className="prof-pic">
          <div className="prof-pic-label">Profile photo:</div>
          <input type="file" className="prof-pic-input" />
        </div>
        <div className="name">
          <div className="name-label">Name:</div>
          <input type="text" className="name-input" />
        </div>
        <div className="email">
          <div className="email-label">Email:</div>
          <input type="email" className="email-input" />
        </div>
        <div className="username">
          <div className="username-label">Username:</div>
          <input type="text" className="username-input" />
        </div>
        <div className="password">
          <div className="password-label">Password:</div>
          <input type="password" className="password-input" />
        </div>
        <div className="confirm-password">
          <div className="confirm-password-label">Confirm Password:</div>
          <input type="password" className="confirm-password-input" />
        </div>
        <div
          className="register-btn"
          onClick={() => props.register("username")}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default Register;
