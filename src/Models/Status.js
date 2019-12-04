export default class Status {
  statuses = [
    {
      user: "nickcummings21",
      text: "This is my first status! :)",
      attachment: "",
      timestamp: ""
    },
    {
      user: "nickcummings21",
      text:
        "Working on a project for my CS 340 class. I hope I get it done soon... because if I don't then I am going to lose points on my project, which would be super depressing since that would affect my grade overall in the class and I don't want that to happen.",
      attachment: "",
      timestamp: ""
    },
    {
      user: "nickcummings21",
      text:
        "This project is taking foreverrrrrr #isitoveryet #cs340 #killmenow",
      attachment: "",
      timestamp: ""
    },
    {
      user: "freddyfreedom",
      text:
        "Hey @nickcummings21, I'm working on a project, too! It's for fighting prejudice in America! #freedom4all #america",
      attachment: "",
      timestamp: ""
    },
    {
      user: "freddyfreedom",
      text:
        "Check out my new autobiography: Narrative of the Life of Frederick Douglass, an American slave #mystory #allaboutme",
      attachment: "",
      timestamp: ""
    },
    {
      user: "khanofkhans",
      text:
        "Thinking about vacationing in China this year... ;) #ConquerorsNeverSleep",
      attachment: "",
      timestamp: ""
    },
    {
      user: "mrblownapart",
      text:
        "Hey, guys! Check this out!",
      attachment: "/strange-planet.jpg",
      timestamp: ""
    }
  ];

  getUserStatuses(username) {
    let userStatuses = [];
    for (let i = 0; i < this.statuses.length; i++) {
      let status = this.statuses[i];
      if (status.user === username) userStatuses.push(status);
    }
    return userStatuses;
  }

  createStatus(status) {
    // TODO: send status to status service
  }
}
