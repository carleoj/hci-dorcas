import React from 'react';
import { Link } from 'react-router-dom'; // No need for NavLink here
import { MdArrowBack } from 'react-icons/md'; 
import './styles/Sidebar.css';

const StudentSidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleSidebar}>
                <MdArrowBack className="icon" />
                <span className="menu-text">MENU</span>
            </button>
            <ul>
                <li><Link to="/student-dashboard" onClick={toggleSidebar}>Home</Link></li>
                <li><Link to="/student-dashboard/book-appointment" onClick={toggleSidebar}>Book an Appointment</Link></li>
                <li><Link to="/student-dashboard/chat-counselor" onClick={toggleSidebar}>Send Counselor a Message</Link></li>
                <li><Link to="/student-dashboard/office-hours" onClick={toggleSidebar}>Guidance Office Hours</Link></li>
                <li><Link to="/student-dashboard/student-about" onClick={toggleSidebar}>About</Link></li>
            </ul>
            <div className="logo-box">
                <p>DORCAS</p><br />
                <p>your safe space</p><br />
                <p>An online counseling app.</p>
            </div>
        </div>
    );
};

export default StudentSidebar;
