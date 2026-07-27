import React, { useState } from 'react';
import Header from './Header';
import './styles/Signup.css';
import { api } from '../api';

const Signup = () => {
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [age, setAge] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userData = {
            studentId,
            name,
            course,
            age,
            username,
            password,
        };
    
        try {
            const response = await fetch(api('/api/signup'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage('Thank you for trusting us, Your DORCAS account has been created successfully!');
                setShowModal(true);
            } else {
                setMessage(data.message || 'Failed to create account, please check your input and try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setMessage('Failed to connect to the server, please try again later.');
        }
    };

    return (
        <div className="app-container">
            <Header></Header>
            <main className="app-main">
                <div className="app-main-content">
                    <div className="overlay-section">
                        <div className="logo-container2">
                            <h3>CREATE YOUR DORCAS ACCOUNT</h3>
                        </div>
                        <div className="form-container">
                            <form className="signup-form" onSubmit={handleSubmit}>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="student-id">Student-ID</label>
                                        <input
                                            type="text"
                                            id="student-id"
                                            placeholder="Enter your Student-ID"
                                            value={studentId}
                                            onChange={(e) => setStudentId(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="course">Course</label>
                                        <input
                                            type="text"
                                            id="course"
                                            placeholder="Enter your course"
                                            value={course}
                                            onChange={(e) => setCourse(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="age">Age</label>
                                        <input
                                            type="number"
                                            id="age"
                                            placeholder="Enter your age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="signup-btn">Create Account</button>
                            </form>
                            {message && <p>{message}</p>}
                        </div>
                    </div>
                </div>
            </main>
            <footer className="app-footer">
                <p>&copy; 2024 Dorcas</p>
            </footer>
            {showModal && (
    <div className="modal">
        <div className="modal-content">
            <h2>Your DORCAS account has been created successfully!</h2>
            <div className="separator"></div>
            <p>Please save your account information.</p>
            <p><strong>Student ID:</strong> {studentId}</p>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Course:</strong> {course}</p>
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Username:</strong> {username}</p>
            <button onClick={() => setShowModal(false)}>Okay</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;