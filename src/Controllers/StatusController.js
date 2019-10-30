import { Status } from "../Models";

export default class StatusController {
  statusModel;

  constructor() {
    this.statusModel = new Status();
  }

  getUserStory({ username }) {
    return this.statusModel.getUserStatuses(username);
  }

  getUserFeed({ following }) {
    let feed = [];
    for (let i = 0; i < following.length; i++) {
      let userStatuses = this.statusModel.getUserStatuses(following[i]);
      feed = feed.concat(userStatuses);
    }
    return feed;
  }

  createStatus(username, text, attachment) {
    
  }
}