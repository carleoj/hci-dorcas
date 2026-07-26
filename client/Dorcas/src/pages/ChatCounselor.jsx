import React, { useState, useEffect, useRef } from "react";
import "./styles/ChatCounselor.css";
import sirRigel from "../assets/sir.jpg";

const ChatCounselor = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Reference to the end of the messages container
  const userId = sessionStorage.getItem("student_id"); // Get the dynamic student ID
  const chatPartnerId = "00-0000"; // Fixed chat partner ID (counselor)

  // Fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId) return; // Ensure userId is present

      try {
        const response = await fetch(
          `http://localhost:8081/api/get-messages?userId=${userId}&chatPartnerId=${chatPartnerId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [userId]);

  // Send a message to the backend
  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender_id: userId, // Dynamic sender ID from session
        receiver_id: chatPartnerId, // Fixed receiver ID (counselor)
        message_text: message,
        isRead: false, // Mark the new message as 'New'
      };

      try {
        const response = await fetch(
          "http://localhost:8081/api/send-messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessage),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const sentMessage = await response.json();

        // Update the local state to add the sent message and keep it as 'New'
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...sentMessage, isRead: false }, // New message marked as unread
        ]);

        setMessage(""); // Clear input field
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Scroll to the bottom of the chatbox whenever new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Trigger scroll when messages change

  return (
    <div className="appointment-container-chat">
      <h1 className="appointments-title">Talk with the Counselor</h1>
      <div className="separator"></div>

      <div className="chatbox-container">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-image-container">
            <img
              src={sirRigel}
              alt="Counselor Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-details">
            <p className="counselor-name">Rigel Villaver</p>
            <p className="counselor-role">School Counselor</p>
          </div>
        </div>

        {/* Messages Section */}
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender_id === userId ? "user" : "counselor"}`}
            >
              <div className="message-text">{msg.message_text}</div>
              <div className="message-time">
                {new Date(msg.sent_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
          ))}
          {/* This div is used to scroll to the bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatCounselor;
