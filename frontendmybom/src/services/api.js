// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Update this with your actual backend URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token'); // Assuming JWT is stored in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//CategoriePanne
export const getCategoriePannes = () => api.get('/categories_pannes/');
export const createCategoriePanne = (data) => api.post('/categories_pannes/', data);
export const updateCategoriePanne = (id, data) => api.put(`/categories_pannes/${id}/`, data);
export const deleteCategoriePanne = (id) => api.delete(`/categories_pannes/${id}/`);

//Secteur
export const getSecteurs =  () => api.get('/secteurs/');
export const createSecteur =  (secteur) => api.post('/secteurs/', secteur);
export const updateSecteur =  (id, secteur) => api.put(`/secteurs/${id}/`, secteur);
export const deleteSecteur =  (id) => api.delete(`/secteurs/${id}/`);

// Radio
export const getRadios = () => api.get('/radios/');
export const createRadio = (radio) => api.post('/radios/', radio);
export const updateRadio = (id, radio) => api.put(`/radios/${id}/`, radio);
export const deleteRadio = (id) => api.delete(`/radios/${id}/`);


// Volume
export const getVolumes = () => api.get('/volumes/');
export const createVolume = (volume) => api.post('/volumes/', volume);
export const updateVolume = (id, volume) => api.put(`/volumes/${id}/`, volume);
export const deleteVolume = (id) => api.delete(`/volumes/${id}/`);

// Conducteur
export const getConducteurs = () => api.get('/conducteurs/');
export const createConducteur = (conducteur) => api.post('/conducteurs/', conducteur);
export const updateConducteur = (id, conducteur) => api.put(`/conducteurs/${id}/`, conducteur);
export const deleteConducteur = (id) => api.delete(`/conducteurs/${id}/`);


// Vehicule
export const getVehicules = () => api.get('/vehicules/');
export const createVehicule = (vehicule) => api.post('/vehicules/', vehicule);
export const updateVehicule = (id, vehicule) => api.put(`/vehicules/${id}/`, vehicule);
export const deleteVehicule = (id) => api.delete(`/vehicules/${id}/`);

// PanneVehicule
export const getPanneVehicules = () => api.get('/pannes_vehicules/');
export const createPanneVehicule = (panneVehicule) => api.post('/pannes_vehicules/', panneVehicule);
export const updatePanneVehicule = (id, panneVehicule) => api.put(`/pannes_vehicules/${id}/`, panneVehicule);
export const deletePanneVehicule = (id) => api.delete(`/pannes_vehicules/${id}/`);