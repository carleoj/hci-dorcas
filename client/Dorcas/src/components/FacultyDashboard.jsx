import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import ViewAppointments from '../pages/ViewAppointments';
import CounselorAbout from '../pages/CounselorAbout';
import './styles/FacultyDashboard.css'
import ChatHistory from '../pages/ChatHistory';
import FacultyHome from './FacultyHome';

const FacultyDashboard = ({ onLogout }) => {

  const location = useLocation();
  const role = sessionStorage.getItem('role');
  
  const renderContent = () => {
    if (location.pathname === '/faculty-dashboard') {
      return <FacultyHome />;  // Render StudentHome for the base dashboard route
    }

    switch (location.pathname) {
      case '/faculty-dashboard/view-appointments':
        return <ViewAppointments />; 
      case '/faculty-dashboard/history-chat':
        return <ChatHistory />;
      case '/faculty-dashboard/counselor-about':
        return <CounselorAbout />;
      default:
        return <Navigate to={location.pathname} />;
    }
  };

  return (
    <div>
      <HomeHeader userRole={role} onLogout={onLogout} /> {/* Pass onLogout here */}
      <div className="app-body">
        <div className="transparent-container">
          {renderContent()}
        </div>
      </div>
      <footer className="home-app-footer">
        <p>&copy; 2024 Dorcas</p>
      </footer>
    </div>
  );
};

export default FacultyDashboard;
