import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import BookAppointment from '../pages/BookAppointment';
import ChatCounselor from '../pages/ChatCounselor';
import EditSchedules from '../pages/EditSchedules';  // Import EditSchedules to use for office hours
import StudentAbout from '../pages/StudentAbout';
import StudentHome from './StudentHome';  // Import StudentHome
import './styles/StudentDashboard.css';

const StudentDashboard = ({ onLogout }) => {
    const location = useLocation();
    const role = sessionStorage.getItem('role');

    // Define the component to render based on the current path
    const renderContent = () => {
        if (location.pathname === '/student-dashboard') {
            return <StudentHome />;  // Render StudentHome for the base dashboard route
        }

        switch (location.pathname) {
            case '/student-dashboard/book-appointment':
                return <BookAppointment onLogout={onLogout} />;
            case '/student-dashboard/chat-counselor':
                return <ChatCounselor />;
            case '/student-dashboard/office-hours':
                return <EditSchedules />;  // Use EditSchedules for office hours
            case '/student-dashboard/student-about':
                return <StudentAbout />;
            default:
                return <Navigate to="/student-dashboard" />;
        }
    };

    return (
        <div>
            <HomeHeader userRole={role} onLogout={onLogout} />
            <div className="app-body">
                <div className="transparent-container">
                    {renderContent()}  {/* Conditionally render based on the path */}
                </div>
            </div>
            <footer className="home-app-footer">
                <p>&copy; 2024 Dorcas</p>
            </footer>
        </div>
    );
};

export default StudentDashboard;
