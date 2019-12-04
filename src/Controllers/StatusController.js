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
    return this.statusModel.getUserStatuses(username);
  }

  getUserFeed = async username => {
    return await this.statusService.getUserFeed(username);
  }

  createStatus = async (username, text, attachment) => {
    
  }
}