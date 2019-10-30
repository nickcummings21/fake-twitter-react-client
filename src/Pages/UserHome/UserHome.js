import React, { useState } from "react";

import { Modal, Backdrop } from "../../Components";
import "./UserHome.css";

// import "../../"
import { Status } from "../../Components";
import { UserController, StatusController } from "../../Controllers";

const UserHome = props => {
  const userController = new UserController();
  const statusController = new StatusController();
  const user = userController.getUser(props.targetUser);
  console.log(props.targetUser, user);

  const [pageState, setPageState] = useState("feed");
  const [modalState, setModalState] = useState("hide");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const switchTargetUser = username => {
    props.switchTargetUser(username);
    closeModal();
  };

  const UserLink = props => {
    return (
      <span className="user-link" onClick={() => switchTargetUser(props.user)}>
        {props.children}
      </span>
    );
  };

  const getUserFollowing = () => {
    if (user.following.length > 0) {
      let following = [];
      for (let i = 0; i < user.following.length; i++) {
        let thisUsername = user.following[i];
        let thisUser = userController.getUser(thisUsername);
        following.push(
          <div key={i}>
            {thisUser.name} (@
            <UserLink user={thisUsername}>{thisUsername}</UserLink>)
          </div>
        );
      }
      return following;
    }
  };

  const getUserFollowers = () => {
    if (user.followers.length > 0) {
      let followers = [];
      for (let i = 0; i < user.followers.length; i++) {
        let thisUsername = user.followers[i];
        let thisUser = userController.getUser(thisUsername);
        followers.push(
          <div key={i}>
            {thisUser.name} (@
            <UserLink user={thisUsername}>{thisUsername}</UserLink>)
          </div>
        );
      }
      return followers;
    }
  };

  const openUserFollowingModal = () => {
    setModalState("user-following");
  };

  const openUserFollowersModal = () => {
    setModalState("user-followers");
  };

  const openViewStatusModal = status => {
    console.log(status);
    setSelectedStatus(status);
    setModalState("view-status");
  };

  const openPublishStatusModal = () => {
    setModalState("publish-status");
  };

  const closeModal = () => {
    setModalState("hide");
    setSelectedStatus(null);
  };

  const switchPage = page => {
    console.log(page);
    setPageState(page);
  };

  const getActivePage = () => {
    if (pageState === "story" || props.activeUser !== props.targetUser) {
      return renderUserStory();
    } else return renderUserFeed();
  };

  const renderUserStory = () => {
    return (
      <div className="story">
        {statusController.getUserStory(user).map((status, i) => {
          return (
            <Status
              key={i}
              status={status}
              user={userController.getUser(status.user)}
              open={() => openViewStatusModal(status)}
            />
          );
        })}
      </div>
    );
  };

  const renderUserFeed = () => {
    return (
      <div className="feed">
        {statusController.getUserFeed(user).map((status, i) => {
          return (
            <Status
              key={i}
              status={status}
              user={userController.getUser(status.user)}
              open={() => openViewStatusModal(status)}
            />
          );
        })}
      </div>
    );
  };

  const renderSelectedStatus = () => {
    if (!selectedStatus) return null;
    let statusUser = userController.getUser(selectedStatus.user);

    return (
      <div className="status-modal">
        <div className="status-modal-title-row">
          <div className="status-modal-prof-pic-container">
            <img
              src={require("../../assets" + statusUser.pic)}
              alt="prof-pic"
            />
          </div>
          <div className="status-modal-names">
            <div className="status-modal-realname">{statusUser.name}</div>
            <div
              className="status-modal-username user-link"
              onClick={() => switchTargetUser(statusUser.username)}
            >
              @{statusUser.username}
            </div>
          </div>
        </div>
        <div className="status-modal-body">
          <div className="status-modal-text">{selectedStatus.text}</div>
          {selectedStatus.attachment !== "" ? (
            <div className="status-modal-attachment">
              <img
                src={require("../../assets" + selectedStatus.attachment)}
                alt=""
                // onClick={() => window.open("../../assets" + selectedStatus.attachment, '_blank')}
              />
            </div>
          ) : null}
          <div className="status-modal-close-btn" onClick={closeModal}>
            Close
          </div>
        </div>
      </div>
    );
  };

  let storyClasses =
    pageState === "story" ? "toolbar-link active" : "toolbar-link";
  let feedClasses =
    pageState === "feed" ? "toolbar-link active" : "toolbar-link";

  return (
    <div className="home">
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
          <div className="user-following" onClick={openUserFollowingModal}>
            Following: {user.following.length}
          </div>
          <div className="user-followers" onClick={openUserFollowersModal}>
            Followers: {user.followers.length}
          </div>
          {props.activeUser === props.targetUser ? (
            <div>
              <div
                className="publish-status-btn"
                onClick={openPublishStatusModal}
              >
                Create post
              </div>
              <span>New profile picture: </span>
              <input type="file" className="user-prof-pic-input" />
            </div>
          ) : null}
        </div>
      </div>
      <div className="toolbar">
        <div className={storyClasses} onClick={() => switchPage("story")}>
          Story
        </div>
        {props.activeUser === props.targetUser ? (
          <div className={feedClasses} onClick={() => switchPage("feed")}>
            Feed
          </div>
        ) : null}
      </div>
      {getActivePage()}
      <Backdrop show={modalState !== "hide"} close={closeModal} />
      <Modal show={modalState === "user-following"} width={400}>
        <div className="user-info-modal">
          <div className="user-info-modal-title">
            {user.name} (@{user.username})<br></br>is following:
          </div>
          <div className="user-info-modal-list">{getUserFollowing()}</div>
          <div className="user-info-modal-close-btn" onClick={closeModal}>
            Close
          </div>
        </div>
      </Modal>
      <Modal show={modalState === "user-followers"} width={400}>
        <div className="user-info-modal">
          <div className="user-info-modal-title">
            {user.name} (@{user.username})<br></br>is followed by:
          </div>
          <div className="user-info-modal-list">{getUserFollowers()}</div>
          <div className="user-info-modal-close-btn" onClick={closeModal}>
            Close
          </div>
        </div>
      </Modal>
      <Modal show={modalState === "view-status"} width={400}>
        {renderSelectedStatus()}
      </Modal>
      <Modal show={modalState === "publish-status"} width={400}>
        <div className="publish-status-modal">
          <div className="publish-status-modal-title">Publish a status:</div>
          <div className="publish-status-modal-input">
            <textarea
              name="status"
              id="new-status"
              cols="43"
              rows="10"
            ></textarea>
          </div>
          Attach a file:{" "}
          <input type="file" className="publish-status-modal-attach-file" />
          <div className="publish-status-modal-btns">
            <div
              className="publish-status-modal-submit-btn"
              onClick={closeModal}
            >
              Submit
            </div>
            <div
              className="publish-status-modal-cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserHome;
