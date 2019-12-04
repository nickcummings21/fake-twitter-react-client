import { UserService } from "../Services";

export default class User {
  userService = new UserService();

  getUser = async username => {
    return await this.userService.getUser(username);
  }

  getUserInfo = async username => {
    return this.userService.getUserInfo(username);
  }
}
