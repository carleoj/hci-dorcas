// CounselorSidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md'; 
import './styles/Sidebar.css';

const FacultySidebar = ({ isOpen, toggleSidebar }) => {

    const navigate = useNavigate(); 

    const handleLogout = () => {
        onLogout(); 
        navigate('/login');     
    };
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleSidebar}>
                <MdArrowBack className="icon" /> {/* Back arrow icon */}
                <span className="menu-text">MENU</span> {/* Placeholder text */}
            </button>
            <ul>
                <li><Link to="/faculty-dashboard" onClick={toggleSidebar}>Home</Link></li>
                <li><Link to="/faculty-dashboard/view-appointments" onClick={toggleSidebar}>View Appointments</Link></li>
                <li><Link to="/faculty-dashboard/history-chat" onClick={toggleSidebar}>Chats and History</Link></li>
                <li><Link to="/faculty-dashboard/counselor-about" onClick={toggleSidebar}>About</Link></li>
            </ul>
            <div className="logo-box">
                <p>DORCAS</p><br />
                <p>your safe space</p><br />
                <p>An online counseling app.</p>
            </div>
        </div>
    );
};

export default FacultySidebar;
