import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingA from './components/LandingA';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import ProtectedRoute from './components/protected_routes/ProtectedRoute';
import BookAppointment from './pages/BookAppointment';
import ChatCounselor from './pages/ChatCounselor';
import OfficeHours from './pages/OfficeHours';
import StudentAbout from './pages/StudentAbout';
import ViewAppointments from './pages/ViewAppointments';
import ChatHistory from './pages/ChatHistory';
import EditSchedules from './pages/EditSchedules';
import CounselorAbout from './pages/CounselorAbout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // State to store user role

  useEffect(() => {
    const userSession = sessionStorage.getItem('isAuthenticated');
    const role = sessionStorage.getItem('role'); // Retrieve role from session storage
    setIsAuthenticated(userSession === 'true');
    setUserRole(role); // Set the user role state
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('role'); // Ensure role is also cleared on logout
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingA />} />
        <Route 
          path='/login' 
          element={isAuthenticated ? (userRole === 'counselor' ? <Navigate to="/faculty-dashboard" /> : <Navigate to="/student-dashboard" />) : <Login onLogin={handleLogin} />} 
        />
        <Route path='/signup' element={<Signup />} />
        <Route 
          path='/student-dashboard/*'
          element={<ProtectedRoute element={<StudentDashboard onLogout={handleLogout} />} isAuthenticated={isAuthenticated} />} 
        >
          <Route index element={<Navigate to="/student-dashboard" />} />
          <Route path="book-appointment" element={<BookAppointment onLogout={handleLogout} />} />
          <Route path="chat-counselor" element={<ChatCounselor />} />
          <Route path="office-hours" element={<OfficeHours />} />
          <Route path="student-about" element={<StudentAbout />} />
        </Route>
        <Route 
          path='/faculty-dashboard/*' 
          element={<ProtectedRoute element={<FacultyDashboard onLogout={handleLogout} />} isAuthenticated={isAuthenticated} />} 
        >
          <Route index element={<Navigate to="/faculty-dashboard" />} />
          <Route path="view-appointments" element={<ViewAppointments onLogout={handleLogout} />} />
          <Route path="history-chat" element={<ChatHistory />} />
          <Route path="edit-schedules" element={<EditSchedules />} />
          <Route path="counselor-about" element={<CounselorAbout />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;