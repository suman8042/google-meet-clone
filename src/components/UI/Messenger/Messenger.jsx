import React, { useState } from "react";
import "./Messenger.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Messenger = ({ setIsMessenger, sendMsg, messageList }) => {
  const [msg, setMsg] = useState("");

  const handleChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMsg(msg);
      setMsg("");
    }
  };

  const handleSendMsg = () => {
    sendMsg(msg);
    setMsg("");
  };

  return (
    <div className="messenger-container">
      <div className="messenger-header">
        <h3>Chat</h3>
        <button onClick={() => setIsMessenger(false)}>Close</button>
      </div>
      <div className="chat-section">
        {messageList.map((item) => (
          <div key={item.time} className={`chat-block ${item.user}`}>
            <div className="sender">
              {item.user} <small>{new Date(item.time).toLocaleTimeString()}</small>
            </div>
            <p className="msg">{item.msg}</p>
          </div>
        ))}
      </div>
      <div className="send-msg-section">
        <input
          placeholder="Send a message to everyone"
          value={msg}
          onChange={handleChangeMsg}
          onKeyDown={handleKeyDown}
        />
        <FontAwesomeIcon
          className="icon"
          icon={faPaperPlane}
          onClick={handleSendMsg}
        />
      </div>
    </div>
  );
};

export default Messenger;
