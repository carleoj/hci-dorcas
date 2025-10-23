import React from 'react';
import './styles/EditSchedules.css';

const EditSchedules = () => {
  return (
    <div className="edit-schedules-container">
      <div className="schedule-card">
        <h2>Guidance Office Schedule</h2>
        <div className="separator"></div>
        <p><strong>8:00 AM - 11:30 AM</strong> - Morning</p>
        <p><strong>1:30 PM - 5:00 PM</strong> - Afternoon</p>
        <p>Monday to Thursday, No Fridays</p>
        
          <h2>Other Schedules</h2>
          <div className="separator"></div>
          <p><strong>Anytime </strong></p>
          <p>(Urgent or Emergency)</p>
        </div>
      </div>
    
  );
};

export default EditSchedules;