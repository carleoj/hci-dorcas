import React, { useEffect, useState } from 'react';
import './styles/StudentHome.css';

const StudentHome = () => {
    const [appointments, setAppointments] = useState([]);
    const name = sessionStorage.getItem('name');
    const studentId = sessionStorage.getItem('student_id'); // Assuming you store studentId in sessionStorage

    useEffect(() => {
        // Fetch appointments from the backend using fetch
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/appointments?studentId=${studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data); // Store appointments in state
                } else {
                    const errorData = await response.json();
                    console.error('Failed to fetch appointments:', errorData.error || response.statusText);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
    
        if (studentId) {
            fetchAppointments();
        }
    }, [studentId]);

    return (
        <div>
            <div className="content-container">
                <p className="welcome-message">
                    Welcome, {name}
                </p>
                <span className="connection-status">
                    <span className="green-circle"></span>
                    Online
                </span>
            </div>
            <div className="student-content-container">
                <p>YOUR APPOINTMENTS</p><br />
                <div className="table-container">
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr key={appointment.request_id}>
                                        <td>{appointment.request_id}</td>
                                        <td>{new Date(appointment.requested_at).toLocaleDateString()}</td>
                                        <td>{new Date(appointment.requested_at).toLocaleTimeString()}</td>
                                        <td>{appointment.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No appointments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;
