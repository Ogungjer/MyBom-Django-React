// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Rapport from './components/Rapport/Rapport';
import CategoriePanneTable from './components/CategoriePanne/CategoriePanneTable';
import SecteurTable from './components/Secteur/SecteurTable';
import RadioTable from './components/Radio/RadioTable';
import VolumeTable from './components/Volume/VolumeTable';
import ConducteurTable from './components/Conducteur/ConducteurTable';
import PanneVehiculeTable from './components/PanneVehicule/PanneVehiculeTable';
import TourneeTable from "./components/Tournee/TourneeTable";

// Helper function to check if the token is valid (exists and not expired)
const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
        // Decode token and check expiration (optional, depends on how you manage tokens)
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return tokenPayload.exp > currentTime; // Token should have an exp field with expiration time in seconds
    } catch (error) {
        return false; // Token invalid or error in decoding
    }
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/" />;
};

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<Login />} />

                    {/* Protected Routes */}
                    <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                    <Route path="/rapport" element={<PrivateRoute element={<Rapport />} />} />
                    <Route path="/categories-pannes" element={<PrivateRoute element={<CategoriePanneTable />} />} />
                    <Route path="/secteurs" element={<PrivateRoute element={<SecteurTable />} />} />
                    <Route path="/radios" element={<PrivateRoute element={<RadioTable />} />} />
                    <Route path="/volumes" element={<PrivateRoute element={<VolumeTable />} />} />
                    <Route path="/conducteurs" element={<PrivateRoute element={<ConducteurTable />} />} />
                    <Route path="/pannes-vehicules" element={<PrivateRoute element={<PanneVehiculeTable />} />} />
                    <Route path="/tournees" element={<PrivateRoute element={<TourneeTable />} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
