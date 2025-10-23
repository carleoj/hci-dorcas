import React, { useState, useEffect } from 'react';
import './styles/BookAppointment.css';

const BookAppointment = () => {
    const initialFormData = {
        reason: '',
        date: '',
        time: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const storedStudentId = sessionStorage.getItem('student_id');
        if (storedStudentId) {
            setStudentId(storedStudentId);
        }
        fetchAppointments(); 
    }, []);

    const fetchAppointments = async () => {
        const studentId = sessionStorage.getItem('student_id')
    
        if (!studentId) {
            console.error('Student ID is not defined');
            return; 
        }
    
        try {
            const response = await fetch(`http://localhost:8081/api/get-user-appointments/${studentId}`); 
            if (!response.ok) {
                throw new Error(`Failed to fetch appointments: ${response.statusText}`);
            }
            const data = await response.json();
            setAppointments(data); // Set the appointments state
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setConfirmModalOpen(true); // Open confirmation modal instead of directly submitting
    };

    const handleConfirmSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/add-new-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    student_id: studentId 
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit appointment request');
            }

            const result = await response.json();
            setFormData(initialFormData);
            setModalOpen(false);
            setConfirmModalOpen(false);
            fetchAppointments(); // Refresh the appointments list after submission
        } catch (error) {
            console.error('Error submitting appointment request:', error);
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="appointment-container">
            <h1 className="appointments-title">Book an Appointment</h1>
            <div className="separator"></div>
            <button className="add-request-button" onClick={openModal}>Book new appointment</button>

            {modalOpen && (
                <div className="appointment-modal">
                    <div className="appointment-modal-content">
                        <h2>Book Appointment</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="appointment-label">
                                Reason for Appointment:
                                <input type="text" name="reason" value={formData.reason} onChange={handleChange} required className="appointment-input" />
                            </label>
                            <label className="appointment-label">
                                Date:
                                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="appointment-input" />
                            </label>
                            <label className="appointment-label">
                                Time:
                                <input type="time" name="time" value={formData.time} onChange={handleChange} required className="appointment-input" />
                            </label>
                            <div className="button-group">
                                <button type="submit" className="submit-button">Submit</button>
                                <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {confirmModalOpen && (
                <div className="confirmation-modal">
                    <div className="confirmation-modal-content">
                        <h2>Confirm Appointment</h2>
                        <p><strong>Reason:</strong> {formData.reason}</p>
                        <p><strong>Date:</strong> {formData.date}</p>
                        <p><strong>Time:</strong> {formData.time}</p>
                        <div className="button-group">
                            <button className="submit-button" onClick={handleConfirmSubmit}>OK</button>
                            <button className="cancel-button" onClick={() => setConfirmModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <br />
            <div className="active-requests">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <div key={appointment.request_id} className="appointment-card-s">
                            <h3>{appointment.reason}</h3>
                            <p><strong>Date:</strong> {new Date(appointment.requested_at).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {new Date(appointment.requested_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p><strong>Status:</strong> {appointment.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No appointments found.</p>   
                )}
            </div>

        </div>
    );
};

export default BookAppointment;
