import React, { useState } from 'react';
import './Chatbot_new.css';
function ChatBox() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [chatboxVisible, setChatboxVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      const newMessage = {
        text: message,
        time: new Date(),
        sent: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setTimeout(autoReply, 1000);
    }
  }

  const autoReply = () => {
    const reply = {
      text: 'Thank you for your awesome support!',
      time: new Date(),
      sent: false,
    };
    setMessages([...messages, reply]);
  }

  const handleDropdownClick = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const handleChatboxClick = () => {
    setChatboxVisible(!chatboxVisible);
  }

  const addZero = (num) => {
    return num < 10 ? '0'+num : num
  }

  return (
    <div className="chatbox-wrapper">
      <div className="chatbox-toggle" onClick={handleChatboxClick}>
        <i className='bx bx-message-dots'></i>
      </div>
      {chatboxVisible && (
        <div className="chatbox-message-wrapper">
          <div className="chatbox-message-header">
            {/* ... */}
            <div className="chatbox-message-dropdown" onClick={handleDropdownClick}>
              <i className='bx bx-dots-vertical-rounded chatbox-message-dropdown-toggle'></i>
              {dropdownVisible && (
                <ul className="chatbox-message-dropdown-menu">
                  <li>
                    <a href="#">Search</a>
                  </li>
                  <li>
                    <a href="#">Report</a>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="chatbox-message-content">
            {messages.map((m, i) => (
              <div key={i} className={`chatbox-message-item ${m.sent ? 'sent' : 'received'}`}>
                <span className="chatbox-message-item-text">
                  {m.text}
                </span>
                <span className="chatbox-message-item-time">
                  {`${addZero(m.time.getHours())}:${addZero(m.time.getMinutes())}`}
                </span>
              </div>
            ))}
            {messages.length === 0 && (
              <h4 className="chatbox-message-no-message">You don't have message yet!</h4>
            )}
          </div>
          <div className="chatbox-message-bottom">
            <form onSubmit={handleSubmit} className="chatbox-message-form">
              <textarea 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                rows="1" 
                placeholder="Type message..." 
                className="chatbox-message-input" 
              />
              <button type="submit" className="chatbox-message-submit">
                <i className='bx bx-send'></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBox;

