import User from "../Models/User";

export default class UserController {
  userModel;

  constructor() {
    this.userModel = new User();
  }

  getUser(username) {
    return this.userModel.getUser(username);
  }

  getUserInfo(username) {
    return this.userModel.getUserInfo(username);
  }

  createUser(user) {
    this.userModel.createUser(user);
  }

  followUser = async (activeUser, followThisUser) => {
    await this.userModel.followUser(activeUser, followThisUser);
  };

  unfollowUser = async (activeUser, unfollowThisUser) => {
    await this.userModel.unfollowUser(activeUser, unfollowThisUser);
  };
}
