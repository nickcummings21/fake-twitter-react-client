export default class User {
  users = [
    {
      pic: "/nick-prof-pic.jpg",
      name: "Nick Cummings",
      email: "nickcummings21@yahoo.com",
      username: "nickcummings21",
      following: ["freddyfreedom", "khanofkhans", "mrblownapart"],
      followers: ["freddyfreedom", "khanofkhans"]
    },
    {
      pic: "/Frederick_Douglas.jpg",
      name: "Frederick Douglas",
      email: "freedom4all@gmail.com",
      username: "freddyfreedom",
      following: ["nickcummings21"],
      followers: ["nickcummings21"]
    },
    {
      pic: "/Genghis_Khan.png",
      name: "Genghis Khan",
      email: "mongolpride@hotmail.com",
      username: "khanofkhans",
      following: ["mrblownapart", "nickcummings21"],
      followers: ["mrblownapart", "nickcummings21"]
    },
    {
      pic: "/napoleon.jpg",
      name: "Napoleon Bonaparte",
      email: "bewarethedwarf@gmail.com",
      username: "mrblownapart",
      following: ["khanofkhans"],
      followers: ["khanofkhans", "nickcummings21"]
    }
  ];

  getUser(username) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) return this.users[i];
    }
    return null;
  }
}
