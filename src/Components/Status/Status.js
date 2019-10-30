import React from "react";
import "./Status.css";
import "../../assets/blank-prof-pic.png";

const Status = props => {
  const imgSrc = props.user.pic === "" ? "/blank-prof-pic.png" : props.user.pic;
  return (
    <div className="status" onClick={props.open}>
      <div className="status-prof-pic-col">
        <div className="status-prof-pic-container">
          <img src={require("../../assets" + imgSrc)} alt="profile-pic" />
        </div>
      </div>
      <div className="name" onClick={props.open}>
        <div className="realname">{props.user.name}</div>
        <div className="username">{"@" + props.user.username}</div>
      </div>
      <div className="text">
        {props.status.text}
        {props.status.attachment !== "" ? (
          <div className="attachment">
            <img
              src={require("../../assets" + props.status.attachment)}
              alt="attachment"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Status;
