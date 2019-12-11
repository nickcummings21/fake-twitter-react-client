import { UserService } from "../Services";

export default class User {
  userService = new UserService();

  getUser = async username => {
    return await this.userService.getUser(username);
  };

  getUserInfo = async username => {
    return this.userService.getUserInfo(username);
  };

  createUser = async user => {
    await this.userService.createUser(user);
  };

  followUser = async (activeUser, targetUser) => {
    await this.userService.followUser(activeUser, targetUser);
  };

  unfollowUser = async (activeUser, targetUser) => {
    await this.userService.unfollowUser(activeUser, targetUser);
  };
}
