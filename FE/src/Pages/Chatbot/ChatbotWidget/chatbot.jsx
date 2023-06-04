import React, { useState, useEffect } from 'react';
import './static/css/materialize.min.css';
import './static/css/style.css';
import botAvatar from './static/img/botAvatar.png';

function Chatbot() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const clearChats = () => {
    setChats([]);
  };

  const closeWidget = () => {
    // your logic here
  };
  // Handle dropdown items' onClick events
  const handleClear = () => { /* Clear the chat */ };
  const handleRestart = () => { /* Restart the chat */ };
  const handleClose = () => { /* Close the chat */ };

  return (
    <div className="container">
      {/* Chatbot widget */}
      <div className="widget">
        <div className="chat_header">
          <span className="chat_header_title">Book&Chill</span>
          <span className="dropdown-trigger" href="#" data-target="dropdown1">
            <i className="material-icons">more_vert</i>
          </span>

          {/* Dropdown menu */}
          <ul id="dropdown1" className="dropdown-content">
            <li><a href="#" id="clear" onClick={handleClear}>Clear</a></li>
            <li><a href="#" id="restart" onClick={handleRestart}>Restart</a></li>
            <li><a href="#" id="close" onClick={handleClose}>Close</a></li>
          </ul>
        </div>

        {/* Chatbot contents goes here */}
        <div className="chats" id="chats">
          <div className="clearfix"></div>
        </div>

        {/* Keypad for user to type the message */}
        <div className="keypad">
          <textarea id="userInput" placeholder="Type a message..." className="usrInput"></textarea>
          <div id="sendButton">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      {/* Bot profile */}
      <div className="profile_div" id="profile_div">
        <img className="imgProfile" src={botAvatar} alt="Bot Avatar" />
      </div>

      {/* Bot pop-up intro */}
      {/* ... */}
    </div>
  );
}

export default Chatbot;
