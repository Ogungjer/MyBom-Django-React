// src/components/Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaCogs, FaFileAlt, FaChartBar, FaTable, FaBars } from 'react-icons/fa';

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isCustomOpen, setCustomOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const toggleCustom = () => setCustomOpen(!isCustomOpen);

    return (
        <>

            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <hr/>
                <div className="sidebar-item">
                    <FaChartBar/>
                    {isSidebarOpen && <span>Accueil</span>}
                </div>

                <div className="sidebar-item">
                    <FaFileAlt/>
                    {isSidebarOpen && <span>Gestion des tournées</span>}
                </div>

                <div className="sidebar-item">
                    <FaTable/>
                    {isSidebarOpen && <span>Gestion des véhicules</span>}
                </div>

                <div className="sidebar-item">
                    <FaChartBar/>
                    {isSidebarOpen && <span>Gestion des pannes</span>}
                </div>

                <div className="sidebar-item" onClick={toggleCustom}>
                    <FaCogs/>
                    {isSidebarOpen && <span>Paramètres</span>}
                </div>
                {isSidebarOpen && isCustomOpen && (
                    <div className="sidebar-submenu">
                        <a href="#">Gabarits</a>
                        <a href="#">Secteurs</a>
                        <a href="#">N°Radios</a>
                        <a href="#">Pannes</a>
                    </div>
                )}
                <div className="sidebar-item">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>
                        <FaBars/>
                    </button>
                </div>

            </div>
        </>
    );
};

export default Sidebar;
