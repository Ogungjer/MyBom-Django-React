// src/components/PanneVehicule/PanneVehiculeTable.js

import Home from '../Home/Home';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    Typography,
    MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getPanneVehicules,
    createPanneVehicule,
    updatePanneVehicule,
    deletePanneVehicule,
    getCategoriePannes
} from '../../services/api';
import {frFR} from "@mui/x-data-grid/locales";
import FlashMessage from '../FlashMessage/FlashMessage';
import useFlashMessage from '../FlashMessage/useFlashMessage';

const PanneVehiculeTable = () => {
    const { flashMessage, showFlashMessage, hideFlashMessage } = useFlashMessage();
    const [panneVehicules, setPanneVehicules] = useState([]);
    const [open, setOpen] = useState(false);
    const [categoriePannes, setCategoriePannes] = useState([]);
    const [formData, setFormData] = useState({
        vehicule: '',
        panne: '',
        jour_entree: '',
        heure_entree: '',
        jour_sortie: '',
        heure_sortie: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchPanneVehicules();
        fetchData();
    }, []);

    const fetchPanneVehicules = async () => {
        const response = await getPanneVehicules();
        setPanneVehicules(response.data);
    };

    const fetchData = async () => {
        const categoriePannesRes = await getCategoriePannes();
        setCategoriePannes(categoriePannesRes.data);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            vehicule: '',
            panne: '',
            jour_entree: '',
            heure_entree: '',
            jour_sortie: '',
            heure_sortie: ''
        });
        setEditId(null);
    };

    const handleSave = async () => {
        const dataToSave = { ...formData };

        // Vérifier et retirer les champs vides pour les dates et heures
        if (!formData.jour_entree) delete dataToSave.jour_entree;
        if (!formData.heure_entree) delete dataToSave.heure_entree;
        if (!formData.jour_sortie) delete dataToSave.jour_sortie;
        if (!formData.heure_sortie) delete dataToSave.heure_sortie;

        try {
            if (editId) {
                await updatePanneVehicule(editId, dataToSave);
                showFlashMessage('Mise à jour réussie', 'success');
            } else {
                await createPanneVehicule(dataToSave);
                showFlashMessage('Ajout réussi', 'success')
            }
            fetchPanneVehicules();
            handleClose();
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            if (error.response) {
                console.error('Détails de l\'erreur:', error.response.data);
                alert('Erreur lors de la sauvegarde: ' + JSON.stringify(error.response.data));
            } else {
                showFlashMessage('Erreur lors de la sauvegarde de la panne du véhicule', 'error');
            }
        }
    };

    const handleEdit = (id) => {
        const editItem = panneVehicules.find((item) => item.id === id);
        setFormData(editItem);
        setEditId(id);
        handleClickOpen();
    };

    const handleDelete = async (id) => {
        try {
            await deletePanneVehicule(id);
            showFlashMessage('Suppression réussie', 'success');
            fetchPanneVehicules();
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            showFlashMessage('Erreur lors de la suppression de la panne de véhicule', 'error');
        }
    };

    const columns = [
        { field: 'vehicule', headerName: 'Vehicule', flex: 1, minWidth: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'panne', headerName: 'Panne', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>)},
        { field: 'jour_entree', headerName: 'Jour Entrée', flex: 1, minWidth: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'heure_entree', headerName: 'Heure Entrée', flex: 1, minWidth: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'jour_sortie', headerName: 'Jour Sortie', flex: 1, minWidth: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'heure_sortie', headerName: 'Heure Sortie', flex: 1, minWidth: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>),
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.id)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.id)} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Home>
            <FlashMessage
                open={flashMessage.open}
                message={flashMessage.message}
                severity={flashMessage.severity}
                onClose={hideFlashMessage}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Liste des pannes de véhicules</Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    startIcon={<AddIcon />}
                >
                    Ajouter une nouvelle panne de véhicule
                </Button>
            </Box>
            <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                <DataGrid
                    rows={panneVehicules}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                />
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? 'Modifier' : 'Ajouter '} Panne Vehicule</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Vehicule"
                        fullWidth
                        value={formData.vehicule}
                        onChange={(e) => setFormData({ ...formData, vehicule: e.target.value })}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Panne"
                        fullWidth
                        value={formData.panne}
                        onChange={(e) => setFormData({ ...formData, panne: e.target.value })}
                    >
                        {categoriePannes.map((categoriePanne) => (
                            <MenuItem key={categoriePanne.id} value={categoriePanne.panne}>
                                {categoriePanne.panne}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        label="Jour Entrée"
                        fullWidth
                        type="date"
                        value={formData.jour_entree}
                        onChange={(e) => setFormData({ ...formData, jour_entree: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Heure Entrée"
                        fullWidth
                        type="time"
                        value={formData.heure_entree}
                        onChange={(e) => setFormData({ ...formData, heure_entree: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Jour Sortie"
                        fullWidth
                        type="date"
                        value={formData.jour_sortie}
                        onChange={(e) => setFormData({ ...formData, jour_sortie: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Heure Sortie"
                        fullWidth
                        type="time"
                        value={formData.heure_sortie}
                        onChange={(e) => setFormData({ ...formData, heure_sortie: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Retour
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>
        </Home>
    );
};

export default PanneVehiculeTable;
