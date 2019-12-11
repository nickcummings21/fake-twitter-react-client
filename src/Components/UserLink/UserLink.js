import React from "react";

const UserLink = props => {
  return (
    <span
      className="user-link"
      onClick={() => {
        console.log("Clicked user link.");
        props.switchTargetUser(props.user);
      }}
    >
      {props.children}
    </span>
  );
};

export default UserLink;
