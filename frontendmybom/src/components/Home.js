// src/components/Home.js
// src/components/Home.js
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="content">
                    <div className="welcome-section">
                        <h1>Welcome to SB Admin Pro</h1>
                        <p>A professionally designed admin panel template built with Bootstrap 5</p>
                        <div className="dashboard-examples">
                            <div className="dashboard-card">
                                <h2>Default Dashboard</h2>
                            </div>
                            <div className="dashboard-card">
                                <h2>Affiliate Dashboard</h2>
                            </div>
                            <div className="dashboard-card">
                                <h2>Multipurpose Dashboard</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

