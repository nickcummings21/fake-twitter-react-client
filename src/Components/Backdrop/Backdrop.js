import React from "react";
import "./Backdrop.css";

const Backdrop = props => {
  return props.show ? <div className="backdrop" onClick={props.close}></div> : null;
};

export default Backdrop;
