import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './styles/Login.css';
import { api } from '../api';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(api('/api/login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('student_id', data.user.student_id);
                sessionStorage.setItem('name', data.user.name);
                sessionStorage.setItem('role', data.user.role);
                onLogin();

                if (data.user.role === 'counselor') {
                    navigate('/faculty-dashboard');
                } else {
                    navigate('/student-dashboard');
                }
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to login, please try again.');
        }
    };

    return (
        <div className="app-container">
            <Header />
            <main className="app-main">
                <div className="app-main-content">
                    <div className="overlay-section">
                        <div className="logo-container2">
                            <h3>LOGIN TO YOUR DORCAS ACCOUNT</h3>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="form-container">
                            <form className='login-form' onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        autoComplete="username"
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
                                        autoComplete="current-password"
                                    />
                                </div>
                                <button type="submit" className="login-btn">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="app-footer">
                <p>&copy; 2024 Dorcas</p>
            </footer>
        </div>
    );
};

export default Login;
