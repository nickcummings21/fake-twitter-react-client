import ServerProxy from "../ServerProxy";

export default class StatusService {
  serverProxy = new ServerProxy();
  userFeedLastKey = 1;
  userStoryLastKey = 1;
  hashtagLastKey = -1;
  pageSize = 10;

  resetUserFeedLastKey = () => {
    this.userFeedLastKey = 1;
  }

  resetUserStoryLastKey = () => {
    this.userStoryLastKey = 1;
  }

  resetHashtagLastKey = () => {
    this.hashtagLastKey = 1;
  }

  setPageSize = pageSize => {
    this.pageSize = pageSize;
  }

  getUserFeed = async username => {
    const feedData = await this.serverProxy.getUserFeed(username, this.userFeedLastKey, this.pageSize);
    this.userFeedLastKey = feedData.lastKey;
    return feedData.feed;
  };

  getUserStory = async username => {
    const storyData = await this.serverProxy.getUserStory(username, this.userStoryLastKey, this.pageSize);
    this.userStoryLastKey = storyData.lastKey;
    return storyData.story;
  };

  getStatusesByHashtag = async hashtag => {
    const hashtagData = await this.serverProxy.getStatusesByHashtag(hashtag, this.hashtagLastKey, this.pageSize);
    this.hashtagLastKey = hashtagData.lastKey;
    return hashtagData;
  };

  createStatus = async status => {
    return await this.serverProxy.createStatus(status);
  };
}
