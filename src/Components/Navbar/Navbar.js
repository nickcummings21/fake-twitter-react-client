import React from "react";
import "./Navbar.css";

const Navbar = props => {
  const getLinks = () => {
    switch (props.activePage) {
      case "login":
        return null;
      case "register":
        return null;
      case "userHome":
        return (
          <div className="navbar-link" onClick={props.logout}>
            Logout
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-brand" onClick={props.goUserHome}>
        <i className="fab fa-twitter"></i>
      </div>
      <div className="navbar-title" onClick={props.goUserHome}>
        Fake Twitter
      </div>
      <div className="navbar-links">{getLinks()}</div>
    </div>
  );
};

export default Navbar;
