import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LandingA.css';
import logo from '../assets/logoDorcas.png';

const LandingA = () => {
    const navigate = useNavigate();

    const switchToLogin = () => {
        navigate('/login');
    };

    const switchToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="glow">WELCOME TO DORCAS</h1>
            </header>
            <main className="app-main">
                <div className="app-main-content">
                    <div className="overlay-section">
                        <div className="logo-container2">
                            <img className='logoimg' src={logo} alt="Dorcas Logo" />
                            <h2>DORCAS</h2>
                            <h3>Your safe space</h3>
                        </div>
                        <div className="buttons-container">
                            <button className='slogin' onClick={switchToLogin}>Login</button>
                            <button className='signup' onClick={switchToSignup}>Student Signup</button>
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

export default LandingA;
