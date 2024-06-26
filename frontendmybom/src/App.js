// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Vehicules from './components/Vehicules';
import Login from './components/Login';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/vehicules" element={<Vehicules />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
