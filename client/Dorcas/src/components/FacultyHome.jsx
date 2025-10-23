import React, { useEffect, useState } from 'react';
import './styles/FacultyHome.css';

const FacultyHome = () => {
  const [counts, setCounts] = useState({
    totalRequests: 0,
    totalPending: 0,
    totalApproved: 0,
    totalCompleted: 0,
  });

  const name = sessionStorage.getItem('name');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/request-counts'); // Adjust URL as needed
        if (response.ok) {
          const data = await response.json();
          setCounts(data);
        } else {
          console.error('Failed to fetch counts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <div className="content-container">
        <p className="welcome-message">Welcome, {name}</p>
        <span className="connection-status">
          <span className="green-circle"></span>
          Online
        </span>
      </div>
      <div className="student-content-container">
        <p>FACULTY DASHBOARD</p><br />
        <div className="dashboard-stats">
          <div className="stat-container total-requests">
            <h4>Total Requests</h4>
            <p>{counts.totalRequests}</p>
          </div>
          <div className="stat-container total-pending">
            <h4>Total Pending</h4>
            <p>{counts.totalPending}</p>
          </div>
          <div className="stat-container total-approved">
            <h4>Total Approved</h4>
            <p>{counts.totalApproved}</p>
          </div>
          <div className="stat-container total-completed">
            <h4>Total Completed</h4>
            <p>{counts.totalCompleted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;
