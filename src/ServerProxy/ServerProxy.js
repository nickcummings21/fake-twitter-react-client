import apigClientFactory from "aws-api-gateway-client";

export default class ServerProxy {
  config = {
    invokeUrl: "https://x5tuk5nxa6.execute-api.us-east-2.amazonaws.com/dev"
  };
  apigClient = apigClientFactory.newClient(this.config);

  getUser = async username => {
    let getUserResult = await this.apigClient.invokeApi(
      {},
      "/users/" + username,
      "GET",
      {},
      {}
    );

    console.log("Get User data", username, getUserResult.data);
    return getUserResult.data;
  };

  getUserFollowers = async (username, lastKey, pageSize) => {
    const path =
      "/followers/" +
      username +
      "?lastKey=" +
      lastKey +
      "&pageSize=" +
      pageSize;

    let getUserFollowersResult = await this.apigClient.invokeApi(
      {},
      path,
      "GET",
      {},
      {}
    );
    console.log("Get User Followers", username, getUserFollowersResult.data);
    return getUserFollowersResult.data;
  };

  getUserFollowing = async (username, lastKey, pageSize) => {
    const path =
      "/following/" +
      username +
      "?lastKey=" +
      lastKey +
      "&pageSize=" +
      pageSize;

    let getUserFollowingResult = await this.apigClient.invokeApi(
      {},
      path,
      "GET",
      {},
      {}
    );
    console.log("Get User Following", username, getUserFollowingResult.data);
    return getUserFollowingResult.data;
  };

  followUser = async (activeUser, followThisUser) => {
    let body = {
      activeUser,
      followUser: followThisUser
    };
    let followUserResult = await this.apigClient.invokeApi(
      {},
      "/follow",
      "POST",
      {},
      body
    );
    console.log("Follow User", followUserResult.data);
    return followUserResult.data;
  };

  unfollowUser = async (activeUser, unfollowThisUser) => {
    let body = {
      activeUser,
      unfollowUser: unfollowThisUser
    };
    let unfollowUserResult = await this.apigClient.invokeApi(
      {},
      "/unfollow",
      "POST",
      {},
      body
    );
    console.log("Unfollow User", unfollowUserResult.data);
    return unfollowUserResult.data;
  };

  getUserFeed = async (username, lastKey, pageSize) => {
    const path =
      "/feed/" + username + "?lastKey=" + lastKey + "&pageSize=" + pageSize;

    let getUserFeedResult = await this.apigClient.invokeApi(
      {},
      path,
      "GET",
      {},
      {}
    );
    console.log("Get User Feed", username, getUserFeedResult.data);
    return getUserFeedResult.data;
  };

  getUserStory = async (username, lastKey, pageSize) => {
    const path = "/story/" + username + "?lastKey=" + lastKey + "&pageSize=" + pageSize;
    let getUserStoryResult = await this.apigClient.invokeApi(
      {},
      path,
      "GET",
      {},
      {}
    );
    console.log("Get User Story", getUserStoryResult);
    return getUserStoryResult.data;
  };

  getStatusesByHashtag = async (hashtag, lastKey, pageSize) => {
    let body = {
      hashtag,
      lastKey,
      pageSize
    };
    let getStatusesByHashtagResult = await this.apigClient.invokeApi(
      {},
      "/status/hashtag",
      "GET",
      {},
      body
    );
    console.log("Get Statuses By Hashtag", hashtag, getStatusesByHashtagResult.data);
    return getStatusesByHashtagResult.data;
  };

  createStatus = async status => {
    let body = {
      username: status.username,
      text: status.text,
      attachment: status.attachment,
      timestamp: status.timestamp
    };
    let createStatusResult = await this.apigClient.invokeApi(
      {},
      "/status",
      "POST",
      {},
      body
    );
    console.log("Create Status", createStatusResult.data);
    return createStatusResult.data;
  };
  
  createUser = async user => {
    let body = {
      username: user.username,
      name: user.name,
      email: user.email,
      password: user.password,
      profilePic: user.profilePic
    };
    let createUserResult = await this.apigClient.invokeApi(
      {},
      "/users",
      "POST",
      {},
      body
    );
    console.log("Create User", createUserResult.data);
    return createUserResult.data;
  };
}
