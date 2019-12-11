import React from "react";
import "./UserInfo.css";

const UserInfo = props => {
  const user = props.user;

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const uploadNewProfilePic = () => {
    const picInput = document.querySelector(".user-prof-pic-input");
    toBase64(picInput.files[0]).then(pic => props.updateProfilePic(pic));
  };

  return (
    <div className="user-info-col">
      <div className="prof-pic-container">
        <img src={user.pic} alt="" className="prof-pic" />
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
            <input
              type="file"
              className="user-prof-pic-input"
              onChange={event => uploadNewProfilePic(event)}
              accept=".jpg,.png"
            />
          </div>
        ) : (
          <div>
            <div className="follow-btn" onClick={props.followUser}>
              Follow
            </div>
            <div className="unfollow-btn" onClick={props.unfollowUser}>
              Unfollow
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
