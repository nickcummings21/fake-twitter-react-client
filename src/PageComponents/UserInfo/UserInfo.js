import React from "react";

const UserInfo = props => {
  const user = props.user;

  return (
    <div className="user-info-col">
      <div className="prof-pic-container">
        <img
          src={require("../../assets" + user.pic)}
          alt=""
          className="prof-pic"
        />
      </div>
      <div className="user-info">
        <div className="user-realname">{user.name}</div>
        <div className="user-username">@{user.username}</div>
        <div className="user-following" onClick={props.openUserFollowingModal}>
          Following: {user.following.length}
        </div>
        <div className="user-followers" onClick={props.openUserFollowersModal}>
          Followers: {user.followers.length}
        </div>
        {props.activeIsTarget ? (
          <div>
            <div
              className="publish-status-btn"
              onClick={props.openPublishStatusModal}
            >
              Create post
            </div>
            <span>New profile picture: </span>
            <input type="file" className="user-prof-pic-input" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserInfo;
