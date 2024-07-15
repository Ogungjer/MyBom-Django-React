// src/components/Radio/RadioTable.js

import Home from '../Home/Home';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getRadios, createRadio, updateRadio, deleteRadio } from '../../services/api';

const RadioTable = () => {
    const [radios, setRadios] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ numero: '', description: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchRadios();
    }, []);

    const fetchRadios = async () => {
        const response = await getRadios();
        setRadios(response.data);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ numero: '', description: '' });
        setEditId(null);
    };

    const handleSave = async () => {
        if (editId) {
            await updateRadio(editId, formData);
        } else {
            await createRadio(formData);
        }
        fetchRadios();
        handleClose();
    };

    const handleEdit = (id) => {
        const editItem = radios.find((item) => item.id === id);
        setFormData(editItem);
        setEditId(id);
        handleClickOpen();
    };

    const handleDelete = async (id) => {
        await deleteRadio(id);
        fetchRadios();
    };

    const columns = [
        { field: 'numero', headerName: 'Numéro', flex: 1, minWidth: 150 },
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
                <Typography variant="h4">Liste des radios</Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    startIcon={<AddIcon />}
                >
                    Ajouter un nouveau radio
                </Button>
            </Box>
            <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                <DataGrid
                    rows={radios}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    autoHeight
                />
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? 'Modifier' : 'Ajouter '} Radio</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Numéro"
                        fullWidth
                        value={formData.numero}
                        onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
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

export default RadioTable;
