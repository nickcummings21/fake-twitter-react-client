import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Login, Register, UserHome } from "./Pages";

const App = () => {
  const [pageState, setPageState] = useState("login");
  const [userState, setUserState] = useState({
    loggedIn: false,
    activeUser: "nickcummings21",
    targetUser: "nickcummings21"
  });

  const login = async username => {
    await setUserState({
      loggedIn: true,
      activeUser: "nickcummings21",
      targetUser: "nickcummings21"
    });
    setPageState("userHome");
  };

  const register = async username => {
    await setUserState({
      loggedIn: true,
      activeUser: "nickcummings21",
      targetUser: "nickcummings21"
    });
    setPageState("userHome");
  };

  const logout = () => {
    setUserState({
      loggedIn: false,
      activeUser: "",
      targetUser: ""
    });
    setPageState("login");
  };

  const switchPage = page => {
    setPageState(page);
  };

  const switchTargetUser = async username => {
    await setUserState({
      loggedIn: true,
      activeUser: userState.activeUser,
      targetUser: username
    });
    console.log("Switching target user", userState);
  };

  console.log(pageState);

  const getActivePage = () => {
    switch (pageState) {
      case "login":
        return <Login login={login} register={() => switchPage("register")} />;
      case "register":
        return <Register register={register} />;
      case "userHome":
        return (
          <UserHome
            activeUser={userState.activeUser}
            targetUser={userState.targetUser}
            switchTargetUser={switchTargetUser}
          />
        );
      default:
        return null;
    }
  };

  const getUserHomePage = () => {
    console.log("Go home.");
    if (userState.loggedIn) {
      setUserState({
        loggedIn: true,
        activeUser: userState.activeUser,
        targetUser: userState.activeUser
      });
      switchPage("userHome");
    } else {
      setUserState({
        loggedIn: false,
        activeUser: "",
        targetUser: ""
      });
      switchPage("login");
    }
  };

  return (
    <div className="app">
      <Navbar
        activePage={pageState}
        goUserHome={getUserHomePage}
        logout={logout}
      />
      {getActivePage()}
    </div>
  );
};

export default App;
