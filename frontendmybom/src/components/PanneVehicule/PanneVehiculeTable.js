// src/components/PanneVehicule/PanneVehiculeTable.js

import Home from '../Home/Home';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPanneVehicules, createPanneVehicule, updatePanneVehicule, deletePanneVehicule } from '../../services/api';

const PanneVehiculeTable = () => {
    const [panneVehicules, setPanneVehicules] = useState([]);
    const [open, setOpen] = useState(false);
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
    }, []);

    const fetchPanneVehicules = async () => {
        const response = await getPanneVehicules();
        setPanneVehicules(response.data);
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
        if (editId) {
            await updatePanneVehicule(editId, formData);
        } else {
            await createPanneVehicule(formData);
        }
        fetchPanneVehicules();
        handleClose();
    };

    const handleEdit = (id) => {
        const editItem = panneVehicules.find((item) => item.id === id);
        setFormData(editItem);
        setEditId(id);
        handleClickOpen();
    };

    const handleDelete = async (id) => {
        await deletePanneVehicule(id);
        fetchPanneVehicules();
    };

    const columns = [
        { field: 'vehicule', headerName: 'Vehicule', flex: 1, minWidth: 150 },
        { field: 'panne', headerName: 'Panne', flex: 1, minWidth: 150 },
        { field: 'jour_entree', headerName: 'Jour Entrée', flex: 1, minWidth: 150 },
        { field: 'heure_entree', headerName: 'Heure Entrée', flex: 1, minWidth: 150 },
        { field: 'jour_sortie', headerName: 'Jour Sortie', flex: 1, minWidth: 150 },
        { field: 'heure_sortie', headerName: 'Heure Sortie', flex: 1, minWidth: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
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
                    autoHeight
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
                        margin="dense"
                        label="Panne"
                        fullWidth
                        value={formData.panne}
                        onChange={(e) => setFormData({ ...formData, panne: e.target.value })}
                    />
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
