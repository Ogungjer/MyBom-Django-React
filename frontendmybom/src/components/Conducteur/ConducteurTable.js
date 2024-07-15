// src/components/Conducteur/ConducteurTable.js

import Home from '../Home/Home';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getConducteurs, createConducteur, updateConducteur, deleteConducteur } from '../../services/api';

const ConducteurTable = () => {
    const [conducteurs, setConducteurs] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ nom: '', prenom: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchConducteurs();
    }, []);

    const fetchConducteurs = async () => {
        const response = await getConducteurs();
        setConducteurs(response.data);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ nom: '', prenom: '' });
        setEditId(null);
    };

    const handleSave = async () => {
        if (editId) {
            await updateConducteur(editId, formData);
        } else {
            await createConducteur(formData);
        }
        fetchConducteurs();
        handleClose();
    };

    const handleEdit = (id) => {
        const editItem = conducteurs.find((item) => item.id === id);
        setFormData(editItem);
        setEditId(id);
        handleClickOpen();
    };

    const handleDelete = async (id) => {
        await deleteConducteur(id);
        fetchConducteurs();
    };

    const columns = [
        { field: 'nom', headerName: 'Nom', flex: 1, minWidth: 150 },
        { field: 'prenom', headerName: 'Prénom', flex: 1, minWidth: 150 },
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
                <Typography variant="h4">Liste des conducteurs</Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    startIcon={<AddIcon />}
                >
                    Ajouter un nouveau conducteur
                </Button>
            </Box>
            <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                <DataGrid
                    rows={conducteurs}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    autoHeight
                />
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? 'Modifier' : 'Ajouter '} Conducteur</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom"
                        fullWidth
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Prénom"
                        fullWidth
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
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

export default ConducteurTable;
