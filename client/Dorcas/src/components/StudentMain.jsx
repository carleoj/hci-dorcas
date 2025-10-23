// StudentMain.jsx
import React from 'react';
import StudentDashboard from './StudentDashboard';
import { Outlet } from 'react-router-dom';
import './styles/StudentMain.css'; // Optional: Add CSS for styling if needed.

const StudentMain = ({ onLogout }) => {
    return (
        <div>
            <StudentDashboard onLogout={onLogout} />
            {/* The Outlet will render child routes here */}
            <Outlet />
        </div>
    );
};

export default StudentMain;
