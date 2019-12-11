import { Status } from "../Models";
import { StatusService } from "../Services";

export default class StatusController {
  statusModel;
  statusService;

  constructor() {
    this.statusModel = new Status();
    this.statusService = new StatusService();
  }

  getUserStory = async username => {
    return this.statusService.getUserStory(username);
  }

  getUserFeed = async username => {
    return await this.statusService.getUserFeed(username);
  }

  createStatus = async (username, text, attachment) => {
    const timestamp = Date.now() + "";
    const newStatus = {
      username,
      text,
      attachment,
      timestamp
    };
    await this.statusService.createStatus(newStatus);
  }
}