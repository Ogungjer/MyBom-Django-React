// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">My BOM</div>
            <div className="navbar-items">
                <input type="text" placeholder="Search" className="navbar-search" />
                <a href="#" className="navbar-link">Documentation</a>
                <a href="#" className="navbar-icon">🔔</a>
                <a href="#" className="navbar-icon">📧</a>
                <div className="navbar-profile">
                    <img src="/path/to/profile-pic.png" alt="Profile" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
