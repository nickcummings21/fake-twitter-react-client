import React, { useState } from "react";

import { Modal, Backdrop } from "../../Components";
import { UserInfo, StatusModal } from "../../PageComponents";
import "./UserHome.css";

import { Status } from "../../Components";
import { UserController, StatusController } from "../../Controllers";

const UserHome = props => {
  const userController = new UserController();
  const statusController = new StatusController();

  const [pageState, setPageState] = useState({
    activePage: "feed",
    pageLoaded: false,
    user: {
      basicUserData: null,
      allUserData: null,
      userFeed: null,
      userStory: null
    },
    cachedUsers: {}
  });
  const [modalState, setModalState] = useState("hide");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const resetPageState = newPage => {
    setPageState({
      activePage: newPage ? newPage : "feed",
      pageLoaded: false,
      user: {
        basicData: null,
        allData: null,
        feed: null,
        story: null
      },
      cachedUsers: {}
    });
  };

  const getPageInfo = async () => {
    if (pageState.pageLoaded) return;
    console.log("Getting page info.");

    const user = await userController.getUser(props.targetUser);
    console.log("Got target user", props.targetUser, user);

    const userInfo = await userController.getUserInfo(user.username);
    const userFeed = await statusController.getUserFeed(user.username);
    const userStory = await statusController.getUserStory(user.username);

    // Cache basic info for followers and followees and users in feed
    const cachedUsers = {};
    for (let i = 0; i < userInfo.followers.length; i++) {
      const cacheUser = userInfo.followers[i];
      cachedUsers[cacheUser] = await userController.getUser(cacheUser);
    }
    for (let i = 0; i < userInfo.following.length; i++) {
      const cacheUser = userInfo.following[i];
      cachedUsers[cacheUser] = await userController.getUser(cacheUser);
    }
    for (let i = 0; i < userFeed; i++) {
      const cacheUser = userFeed[i].user;
      cachedUsers[cacheUser] = await userController.getUser(cacheUser);
    }

    console.log("Page just loaded.", userFeed);
    setPageState({
      activePage: "feed",
      pageLoaded: true,
      user: {
        basicData: { ...user },
        allData: { ...userInfo },
        feed: userFeed,
        story: userStory
      },
      cachedUsers
    });
  };

  const switchTargetUser = username => {
    props.switchTargetUser(username);
    closeModal();
    resetPageState();
  };

  const UserLink = props => {
    return (
      <span className="user-link" onClick={() => switchTargetUser(props.user)}>
        {props.children}
      </span>
    );
  };

  const getUserFollowing = () => {
    // console.log(pageState.user);
    const following = pageState.user.allData.following;
    if (following.length > 0) {
      let followingElArray = [];
      for (let i = 0; i < following.length; i++) {
        let thisUsername = following[i];
        let thisUser = pageState.cachedUsers[thisUsername];
        followingElArray.push(
          <div key={i}>
            {thisUser.name} (@
            <UserLink user={thisUsername}>{thisUsername}</UserLink>)
          </div>
        );
      }
      return followingElArray;
    }
  };

  const getUserFollowers = () => {
    const followers = pageState.user.allData.followers;
    if (followers.length > 0) {
      let followersElArray = [];
      for (let i = 0; i < followers.length; i++) {
        let thisUsername = followers[i];
        let thisUser = pageState.cachedUsers[thisUsername];
        followersElArray.push(
          <div key={i}>
            {thisUser.name} (@
            <UserLink user={thisUsername}>{thisUsername}</UserLink>)
          </div>
        );
      }
      return followersElArray;
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
    setPageState(prevState => {
      return {
        activePage: page,
        pageLoaded: true,
        user: prevState.user,
        cachedUsers: prevState.cachedUsers
      };
    });
    // resetPageState(page);
  };

  const getActivePage = () => {
    if (
      pageState.activePage === "story" ||
      props.activeUser !== props.targetUser
    ) {
      return renderUserStory();
    } else return renderUserFeed();
  };

  const renderUserStory = () => {
    return (
      <div className="story">
        {pageState.user.story.map((status, i) => {
          return (
            <Status
              key={i}
              status={status}
              user={pageState.user.basicData}
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
        {pageState.user.feed.map((status, i) => {
          return (
            <Status
              key={i}
              status={status}
              user={pageState.cachedUsers[status.user]}
              open={() => openViewStatusModal(status)}
            />
          );
        })}
      </div>
    );
  };

  const renderSelectedStatus = () => {
    if (!selectedStatus) return null;
    let statusUser = pageState.cachedUsers[selectedStatus.user];

    return (
      <StatusModal
        statusUser={statusUser}
        selectedStatus={selectedStatus}
        switchTargetUser={switchTargetUser}
        closeModal={closeModal}
      />
    );
  };

  const renderPage = () => {
    let storyClasses =
      pageState === "story" ? "toolbar-link active" : "toolbar-link";
    let feedClasses =
      pageState === "feed" ? "toolbar-link active" : "toolbar-link";

    return (
      <div className="home">
        <UserInfo
          activeIsTarget={props.activeUser === props.targetUser}
          user={pageState.user.allData}
          openUserFollowersModal={openUserFollowersModal}
          openUserFollowingModal={openUserFollowingModal}
          openPublishStatusModal={openPublishStatusModal}
        />
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
              {pageState.user.basicData.name} (@
              {pageState.user.basicData.username})<br></br>is following:
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
              {pageState.user.basicData.name} (@
              {pageState.user.basicData.username})<br></br>is followed by:
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

  getPageInfo();
  console.log("Page loaded: ", pageState);
  return pageState.pageLoaded ? renderPage() : <div></div>;
};

export default UserHome;
