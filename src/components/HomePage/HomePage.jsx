import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import Header from './../UI/Header/Header';
import './HomePage.css';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate(); // Correct placement of useNavigate inside the functional component

  const startCall = () => {
    const uid = nanoid(); // Generate a unique ID
    navigate(`/${uid}#init`); // Navigate to the generated URL
  };

  return (
    <div className="home-page">
      <Header /> {/* Assuming you have a Header component */}
      <div className="body">
        <div className="left-side">
          <div className="content">
            <h2>Premium video meetings. Now free for everyone.</h2>
            <p>
              We re-engineered the service we built for secure business meetings,
              Google Meet, to make it free and available for all.
            </p>
            <div className="action-btn">
              <button className="btn green" onClick={startCall}>
                <FontAwesomeIcon className="icon-block" icon={faVideo} />
                New Meeting
              </button>
              <div className="input-block">
                <div className="input-section">
                  <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                  <input placeholder="Enter a code or link" />
                </div>
                <button className="btn no-bg">Join</button>
              </div>
            </div>
          </div>
          <div className="help-text">
            <a href="https://meet.google.com/">Learn more</a> about Google Meet
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            <img
              src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg"
              alt="Google Meet"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
