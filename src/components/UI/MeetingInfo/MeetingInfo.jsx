import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTimes,
  faUser,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./MeetingInfo.css"; // Ensure this path is correct and SCSS is supported in Vite

const MeetingInfo = ({ setMeetInfoPopup, url }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Meeting link copied to clipboard!"); // Added a small alert to notify the user
  };

  return (
    <div className="meeting-info-block">
      <div className="meeting-header">
        <h3>Your meeting's ready</h3>
        <FontAwesomeIcon
          className="icon"
          icon={faTimes}
          onClick={() => setMeetInfoPopup(false)}
        />
      </div>
      <button className="add-people-btn">
        <FontAwesomeIcon className="icon" icon={faUser} />
        Add Others
      </button>
      <p className="info-text">
        Or share this meeting link with others you want in the meeting
      </p>
      <div className="meet-link">
        <span>{url}</span>
        <FontAwesomeIcon className="icon" icon={faCopy} onClick={copyToClipboard} />
      </div>
      <div className="permission-text">
        <FontAwesomeIcon className="icon red" icon={faShieldAlt} />
        <p className="small-text">
          People who use this meeting link must get your permission before they
          can join.
        </p>
      </div>
      <p className="small-text">Joined as akshay@gmail.com</p> {/* Placeholder for dynamic email */}
    </div>
  );
};

export default MeetingInfo;
