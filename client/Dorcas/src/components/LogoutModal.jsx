// LogoutModal.jsx
import React from 'react';
import './styles/LogoutModal.css';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Confirm Logout</h3>
                <p>Are you sure you want to logout?</p>
                <div className="modal-buttons">
                    <button className="confirm-btn" onClick={onConfirm}>Yes</button>
                    <button className="cancel-btn" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
