import React, { useState, useEffect, useRef } from 'react';
import './styles/ChatModal.css';
import { api } from '../api';

const ChatModal = ({ studentId, studentName, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Create a reference to the end of the messages container

  // Fetch messages for the selected student
  useEffect(() => {
    if (!studentId) {
      console.error('Invalid studentId');
      return;
    }
    const fetchMessages = async () => {
        try {
          const response = await fetch(
            api(`/api/get-messages?userId=00-0000&chatPartnerId=${studentId}`)
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      
    fetchMessages();
  }, [studentId]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
  
    try {
      const response = await fetch(api('/api/counselor-send-message'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_id: '00-0000', // Counselor's ID
          receiver_id: studentId, // Student's ID
          message_text: newMessage,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const sentMessage = await response.json(); // Response contains the newly sent message
      sentMessage.sent_at = new Date(sentMessage.sent_at); // Ensure sent_at is a Date object
  
      // Append the sent message to the bottom of the messages array
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
  
      setNewMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  return (
    <div className="chat-modal-container">
      <div className="chat-modal-body">
        <div className="chat-header">
          <span>Chat with {studentName}</span>
          <button className="close-modal-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="chat-messages-container">
          {messages.map((msg) => (
            <div
              key={msg.message_id}
              className={`chat-message ${msg.sender_id === '00-0000' ? 'chat-from-counselor' : 'chat-from-student'}`}
            >
              <p>{msg.message_text}</p>
              <span className="chat-message-time">
                {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Reference to the end of the messages */}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="chat-send-btn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
