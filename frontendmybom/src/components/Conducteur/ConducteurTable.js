// src/components/Conducteur/ConducteurTable.js

import Home from '../Home/Home';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getConducteurs, createConducteur, updateConducteur, deleteConducteur } from '../../services/api';
import {frFR} from "@mui/x-data-grid/locales";
import FlashMessage from '../FlashMessage/FlashMessage';
import useFlashMessage from '../FlashMessage/useFlashMessage';

const ConducteurTable = () => {
    const [conducteurs, setConducteurs] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ nom: '', prenom: '' });
    const [editId, setEditId] = useState(null);
    const { flashMessage, showFlashMessage, hideFlashMessage } = useFlashMessage();

    useEffect(() => {
        fetchConducteurs();
    }, []);

    const fetchConducteurs = async () => {
        try {
            const response = await getConducteurs();
            setConducteurs(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des conducteurs:", error);
            showFlashMessage("Erreur lors du chargement des conducteurs", "error");
        }
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
        try {
            if (editId) {
                await updateConducteur(editId, formData);
                showFlashMessage("Mise à jour réussie", "success");
            } else {
                await createConducteur(formData);
                showFlashMessage("Ajout réussi", "success");
            }
            fetchConducteurs();
            handleClose();
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du conducteur:", error);
            showFlashMessage("Erreur lors de la sauvegarde du conducteur", "error");
        }
    };

    const handleEdit = (id) => {
        const editItem = conducteurs.find((item) => item.id === id);
        setFormData(editItem);
        setEditId(id);
        handleClickOpen();
    };

    const handleDelete = async (id) => {
        try {
            await deleteConducteur(id);
            showFlashMessage("Suppression réussie", "success");
            fetchConducteurs();
        } catch (error) {
            console.error("Erreur lors de la suppression du conducteur:", error);
            showFlashMessage("Erreur lors de la suppression du conducteur", "error");
        }
    };

    const columns = [
        { field: 'nom', headerName: 'Nom', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'prenom', headerName: 'Prénom', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
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
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
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
