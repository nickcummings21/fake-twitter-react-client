import React from "react";
import "./StatusModal.css";

const StatusModal = props => {
  const statusUser = props.statusUser;
  const selectedStatus = props.selectedStatus;

  return (
    <div className="status-modal">
      <div className="status-modal-title-row">
        <div className="status-modal-prof-pic-container">
          <img src={require("../../assets" + statusUser.profilePic)} alt="prof-pic" />
        </div>
        <div className="status-modal-names">
          <div className="status-modal-realname">{statusUser.name}</div>
          <div
            className="status-modal-username user-link"
            onClick={() => props.switchTargetUser(statusUser.username)}
          >
            @{statusUser.username}
          </div>
        </div>
      </div>
      <div className="status-modal-body">
        <div className="status-modal-text">{selectedStatus.text}</div>
        {selectedStatus.attachment !== "" ? (
          <div className="status-modal-attachment">
            <img
              src={require("../../assets" + selectedStatus.attachment)}
              alt=""
              // onClick={() => window.open("../../assets" + selectedStatus.attachment, '_blank')}
            />
          </div>
        ) : null}
        <div className="status-modal-close-btn" onClick={props.closeModal}>
          Close
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
