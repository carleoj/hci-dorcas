// HomeHeader.jsx
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import StudentSidebar from './StudentSidebar';
import FacultySidebar from './FacultySidebar';
import LogoutModal from './LogoutModal'; // Import the modal
import './styles/HomeHeader.css';

const HomeHeader = ({ userRole, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        setIsModalOpen(true); // Open modal on logout
    };

    const handleConfirmLogout = () => {
        onLogout(); // Confirm logout
        setIsModalOpen(false); // Close modal
    };

    const handleCancelLogout = () => {
        setIsModalOpen(false); // Close modal without logging out
    };

    return (
        <>
            <header className="home-app-header">
                <FaBars className="hamburger-icon" onClick={toggleSidebar} />
                <h1 className="logo">DORCAS</h1>
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </header>
            
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
            
            {userRole === 'student' ? (
                <StudentSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            ) : userRole === 'counselor' ? (
                <FacultySidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            ) : null}

            {/* Include the modal in the header */}
            <LogoutModal 
                isOpen={isModalOpen} 
                onClose={handleCancelLogout} 
                onConfirm={handleConfirmLogout} 
            />
        </>
    );
};

export default HomeHeader;
