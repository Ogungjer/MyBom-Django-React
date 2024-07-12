// src/components/Secteur/SecteurTable.js

import Home from '../Home/Home';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getSecteurs, createSecteur, updateSecteur, deleteSecteur } from '../../services/api';

const SecteurTable = () => {
    const [secteurs, setSecteurs] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ nom: '', description: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchSecteurs();
    }, []);

    const fetchSecteurs = async () => {
        const response = await getSecteurs();
        setSecteurs(response.data);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ nom: '', description: '' });
        setEditId(null);
    };

    const handleSave = async () => {
        if (editId) {
            await updateSecteur(editId, formData);
        } else {
            await createSecteur(formData);
        }
        fetchSecteurs();
        handleClose();
    };

    const handleEdit = (id) => {
        const editItem = secteurs.find((item) => item.id === id);
        setFormData(editItem);
        setEditId(id);
        handleClickOpen();
    };

    const handleDelete = async (id) => {
        await deleteSecteur(id);
        fetchSecteurs();
    };

    const columns = [
        { field: 'nom', headerName: 'Nom', flex: 1, minWidth: 150 },
        { field: 'description', headerName: 'Description', flex: 2, minWidth: 200 },
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
                <Typography variant="h4">Liste des secteurs</Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    startIcon={<AddIcon />}
                >
                    Ajouter un nouveau secteur
                </Button>
            </Box>
            <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                <DataGrid
                    rows={secteurs}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    autoHeight
                />
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? 'Modifier' : 'Ajouter '} Secteur</DialogTitle>
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
                        label="Description"
                        fullWidth
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

export default SecteurTable;
