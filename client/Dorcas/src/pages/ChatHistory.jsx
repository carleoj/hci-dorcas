import React, { useState, useEffect } from 'react';
import './styles/ChatHistory.css';
import ChatModal from '../components/ChatModal'; // Import the modal

const ChatHistory = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store both studentId and name

  // Fetch data from the backend
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/chat-history');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Array of { sender_id, name, latest_message_time }
        setStudents(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
    fetchChatHistory();
  }, []);

  // Handle opening the modal
  const handleChatClick = (studentId, studentName) => {
    setSelectedStudent({ studentId, studentName }); // Set selected student details
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedStudent(null); // Clear the selected student
  };

  return (
    <div>
      <h1 className="appointments-title">Chats and History</h1>
      <div className="separator"></div>

      <div className="students-chats-container">
        {students.map((student) => (
          <div
            className="chat-box"
            onClick={() => handleChatClick(student.sender_id, student.name)} // Pass both ID and name
            key={student.sender_id}
          >
            <div className="chat-box-header">{student.name}</div>
            <div className="chat-box-time">
              Last Message: {new Date(student.latest_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>

      {/* Render the ChatModal if a student is selected */}
      {selectedStudent && (
        <ChatModal
          studentId={selectedStudent.studentId}
          studentName={selectedStudent.studentName} // Pass the student's name
          onClose={handleCloseModal} // Handle modal close
        />
      )}
    </div>
  );
};

export default ChatHistory;
