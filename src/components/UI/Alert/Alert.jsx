import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import "./Alert.css";

const Alert = ({ messageAlert }) => {
  if (!messageAlert.isPopup) return null;
  return (
    <div className={`message-alert-popup ${messageAlert.isPopup ? 'visible' : 'hidden'}`}>
      <div className="alert-header">
        <FontAwesomeIcon className="icon" icon={faCommentAlt} />
        <h3>{messageAlert.payload.user}</h3>
      </div>
      <p className="alert-msg">{messageAlert.payload.msg}</p>
    </div>
  );
};

export default Alert;
