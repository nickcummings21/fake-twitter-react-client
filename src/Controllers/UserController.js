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

  createUser(user) {}
}
