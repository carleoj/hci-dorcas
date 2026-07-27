import React, { useEffect, useState } from 'react';
import './styles/ViewAppointments.css';
import { api } from '../api'; 

const ViewAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [toAcceptAppointment, setToAcceptAppointment] = useState(null);
    const [toDeclineAppointment, setToDeclineAppointment] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(api('/api/get-appointments')); 
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleAccept = async (appointment) => {
        setToAcceptAppointment(appointment);
    };

    const handleAcceptRequest = async () => {
        if (toAcceptAppointment) {
            try {
                const response = await fetch(api('/api/accept-appointment'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ request_id: toAcceptAppointment.request_id }),
                });

                if (!response.ok) {
                    throw new Error('Failed to accept appointment');
                }

                const data = await response.json();
                alert(data.message); // Show a success message

                setAppointments((prevAppointments) =>
                    prevAppointments.map((app) =>
                        app.request_id === toAcceptAppointment.request_id
                            ? { ...app, status: 'approved' } // Update the status to 'accepted'
                            : app
                    )
                );

                closeModal(); // Close the modal after accepting
            } catch (error) {
                console.error('Error accepting appointment:', error);
                alert('Failed to accept appointment');
            }
        }
    };

    const handleDecline = async (appointment) => {
        setToDeclineAppointment(appointment);
    };

    const handleDeclineRequest = async () => {
        if (toDeclineAppointment) {
            try {
                const response = await fetch(api('/api/decline-appointment'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ request_id: toDeclineAppointment.request_id }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to decline appointment');
                }
    
                const data = await response.json();
                alert(data.message); // Show a success message
    
                setAppointments((prevAppointments) =>
                    prevAppointments.map((app) =>
                        app.request_id === toDeclineAppointment.request_id
                            ? { ...app, status: 'declined' } 
                            : app
                    )
                );
    
                closeModal();
            } catch (error) {
                console.error('Error declining appointment:', error);
                alert('Failed to decline appointment');
            }
        }
    };

    const handleMarkAsComplete = async (appointment) => {
        try {
            const response = await fetch(api('/api/mark-as-complete'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ request_id: appointment.request_id }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to mark appointment as complete');
            }
    
            const data = await response.json();
            alert(data.message);
    
            setAppointments((prevAppointments) =>
                prevAppointments.map((app) =>
                    app.request_id === appointment.request_id
                        ? { ...app, status: 'completed' }
                        : app
                )
            );
        } catch (error) {
            console.error('Error marking appointment as complete:', error);
            alert('Failed to mark appointment as complete');
        }
    };

    const handleViewMore = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const closeModal = () => {
        setSelectedAppointment(null);
        setToAcceptAppointment(null);
        setToDeclineAppointment(null);
    };

    return (
        <div>
            <h1 className="appointments-title">Appointments</h1>
            <div className="separator"></div>
            <div className="appointments-container">
            {appointments.length > 0 ? (
                appointments
                    .filter(appointment => appointment.status !== 'declined' && appointment.status !== 'completed')
                    .map(appointment => (
                        <div key={appointment.request_id} className="appointment-card">
                            <h2>{appointment.studentName}</h2>
                            <p><strong>Course:</strong> {appointment.course}</p>
                            <p><strong>Date:</strong> {appointment.requested_at.slice(0, 10)}</p>
                            <p><strong>Time:</strong> {appointment.requested_at.slice(11, 16)}</p>
                            <p><strong>Status:</strong> {appointment.status}</p>
                            <div className="appointment-buttons">
    <button
        className="view-more-button"
        onClick={() => handleViewMore(appointment)}
    >
        View More
    </button>
    {appointment.status === 'pending' ? (
        <>
            <button
                className="accept-button"
                onClick={() => handleAccept(appointment)}
            >
                Accept
            </button>
            <button
                className="decline-button"
                onClick={() => handleDecline(appointment)}
            >
                Delete
            </button>
        </>
    ) : appointment.status === 'approved' ? (
        <button
            className="complete-button"
            onClick={() => handleMarkAsComplete(appointment)}
        >
            Mark as Complete
        </button>
    ) : null}
</div>

                        </div>
                    ))
            ) : (
                <p>No appointments available.</p>
            )}
        </div>


            {selectedAppointment && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h3>Appointment Details</h3>
                        <div className="modal-separator"></div>
                        <div className="modal-details">
                            <p><strong>Student Name:</strong> {selectedAppointment.studentName}</p>
                            <p><strong>Course:</strong> {selectedAppointment.course}</p>
                            <p><strong>Reason:</strong> {selectedAppointment.reason}</p>
                            <p><strong>Date:</strong> {selectedAppointment.requested_at.slice(0, 10)}</p>
                            <p><strong>Time:</strong> {selectedAppointment.requested_at.slice(11, 16)}</p>
                        </div>
                    </div>
                </div>
            )}

            {toAcceptAppointment && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h3>Confirm Appointment</h3>
                        <div className="modal-separator"></div> 
                        <div className="modal-details">
                            <p><strong>Reason:</strong> {toAcceptAppointment.reason}</p>
                            <p><strong>Date:</strong> {toAcceptAppointment.requested_at.slice(0, 10)}</p>
                            <p><strong>Time:</strong> {toAcceptAppointment.requested_at.slice(11, 16)}</p>

                            <div className="appointment-buttons">
                                <button className="accept-button" onClick={handleAcceptRequest}>Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {toDeclineAppointment && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h3>Delete / Decline Appointment</h3>
                        <div className="modal-separator"></div>
                        <div className="modal-details">
                            <p><strong>Reason:</strong> {toDeclineAppointment.reason}</p>
                            <p><strong>Date:</strong> {toDeclineAppointment.requested_at.slice(0, 10)}</p>
                            <p><strong>Time:</strong> {toDeclineAppointment.requested_at.slice(11, 16)}</p>
                            <p><i>Note: The student will be notified about the deletion of the appointment.</i></p>
                            <div className="appointment-buttons">
                                <button className="decline-button" onClick={handleDeclineRequest}>Decline</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAppointments;
