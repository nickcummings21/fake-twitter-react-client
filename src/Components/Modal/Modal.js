import React from "react";
import "./Modal.css";

const Modal = props => {
  const leftMargin = "calc(50% - " + props.width / 2 + "px)";
  return props.show ? (
    <div className="modal" style={{ left: leftMargin }}>
      {props.children}
    </div>
  ) : null;
};

export default Modal;
