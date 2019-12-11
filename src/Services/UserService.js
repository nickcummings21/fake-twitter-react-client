import ServerProxy from "../ServerProxy";
import { User } from "../Models";

export default class UserService {
  serverProxy = new ServerProxy();
  userFollowersLastKey = 1;
  userFollowingLastKey = 1;
  pageSize = 10;

  resetUserFollowersLastKey = () => {
    this.userFollowersLastKey = 1;
  };

  resetUserFollowingLastKey = () => {
    this.userFollowingLastKey = 1;
  };

  setPageSize = pageSize => {
    this.pageSize = pageSize;
  }

  createUser = async user => {
    const userData = await this.serverProxy.createUser(user);
    return userData;
  }

  getUserInfo = async username => {
    const userBasicData = await this.getUser(username);
    const userFollowersData = await this.getUserFollowers(username);
    const userFollowingData = await this.getUserFollowing(username);
    const userInfo = {
      username,
      pic: userBasicData.profilePic,
      name: userBasicData.name,
      email: userBasicData.email,
      followers: userFollowersData.followers,
      following: userFollowingData.following,
    }
    return userInfo;
  }

  getUser = async username => {
    const userData = await this.serverProxy.getUser(username);
    return userData;
  };

  getUserFollowers = async username => {
    const followersData = await this.serverProxy.getUserFollowers(
      username,
      this.userFollowersLastKey,
      this.pageSize
    );
    this.userFollowersLastKey = followersData.lastKey;
    return followersData;
  };

  getUserFollowing = async username => {
    const followingData = await this.serverProxy.getUserFollowing(
      username,
      this.userFollowingLastKey,
      this.pageSize
    );
    this.userFollowingLastKey = followingData.lastKey;
    return followingData;
  };

  followUser = async (activeUser, followThisUser) => {
    await this.serverProxy.followUser(activeUser, followThisUser);
  };

  unfollowUser = async (activeUser, unfollowThisUser) => {
    await this.serverProxy.unfollowUser(activeUser, unfollowThisUser);
  };
}
