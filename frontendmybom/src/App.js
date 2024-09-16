// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Rapport from './components/Rapport/Rapport';
import CategoriePanneTable from './components/CategoriePanne/CategoriePanneTable';
import SecteurTable from './components/Secteur/SecteurTable';
import RadioTable from './components/Radio/RadioTable';
import VolumeTable from './components/Volume/VolumeTable';
import ConducteurTable from './components/Conducteur/ConducteurTable';
import VehiculeTable from './components/Vehicule/VehiculeTable';
import PanneVehiculeTable from './components/PanneVehicule/PanneVehiculeTable';
import TourneeTable from "./components/Tournee/TourneeTable";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/rapport" element={<Rapport />} />
                    <Route path="/categories-pannes" element={<CategoriePanneTable />} />
                    <Route path="/secteurs" element={<SecteurTable />} />
                    <Route path="/radios" element={<RadioTable />} />
                    <Route path="/volumes" element={<VolumeTable />} />
                    <Route path="/conducteurs" element={<ConducteurTable />} />
                    <Route path="/vehicules" element={<VehiculeTable />} />
                    <Route path="/pannes-vehicules" element={<PanneVehiculeTable />} />
                    <Route path="/tournees" element={<TourneeTable />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
