// src/components/Vehicles.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vehicules = () => {
    const [vehicules, setVehicules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/vehicules/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setVehicules(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Vehicules</h1>
            <ul>
                {vehicules.map(vehicule => (
                    <li key={vehicule.id}>{vehicule.code_vehicule} - {vehicule.volume}</li>
                ))}
            </ul>
        </div>
    );
};

export default Vehicules;
