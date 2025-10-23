import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className="glow">WELCOME TO DORCAS</h1>
      </Link>
    </header>
  );
};

export default Header;
