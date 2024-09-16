// src/components/CategoriePanne/CategoriePanneTable.js

import Home from '../Home/Home';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getCategoriePannes,
    createCategoriePanne,
    updateCategoriePanne,
    deleteCategoriePanne,
    deleteConducteur
} from '../../services/api';
import {frFR} from "@mui/x-data-grid/locales";
import FlashMessage from '../FlashMessage/FlashMessage';
import useFlashMessage from '../FlashMessage/useFlashMessage';

const CategoriePanneTable = () => {
    const [categoriePannes, setCategoriePannes] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ panne: '', description: '' });
    const [editId, setEditId] = useState(null);
    const { flashMessage, showFlashMessage, hideFlashMessage } = useFlashMessage();

    useEffect(() => {
        fetchCategoriePannes();
    }, []);

    const fetchCategoriePannes = async () => {
        try {
            const response = await getCategoriePannes();
            setCategoriePannes(response.data);
        }catch (error) {
            console.error("Erreur lors de la récupération des Catégories de pannes:", error);
            showFlashMessage("Erreur lors du changement des Catégories de pannes", "error")
        }

    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ panne: '', description: '' });
        setEditId(null);
    };

    const handleSave = async () => {
        try {
            if (editId) {
                await updateCategoriePanne(editId, formData);
                showFlashMessage("Mise à jour réussie", "success");
            } else {
                await createCategoriePanne(formData);
                showFlashMessage("Ajout réussi", "success");
            }
            fetchCategoriePannes();
            handleClose();
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des Categories de pannes:", error);
            showFlashMessage("Erreur lors de la sauvegarde Categories de pannes", "error");
        }
    };

    const handleEdit = (id) => {
        const editItem = categoriePannes.find((item) => item.id === id);
        setFormData(editItem);
        setEditId(id);
        handleClickOpen();
    };


    const handleDelete = async (id) => {
        try {
            await deleteCategoriePanne(id);
            showFlashMessage("Suppression réussie", "success");
            fetchCategoriePannes();
        } catch (error) {
            console.error("Erreur lors de la suppression des Categories de pannes:", error);
            showFlashMessage("Erreur lors de la suppression des Categories de pannes", "error");
        }
    };

    const columns = [
        { field: 'panne', headerName: 'Panne', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'description', headerName: 'Description', flex: 2, minWidth: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
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
                <Typography variant="h4">Liste des pannes</Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    startIcon={<AddIcon />}
                >
                    Ajouter une nouvelle catégorie de panne
                </Button>
            </Box>
            <Box sx={{ height: 'calc(100vh - 200px)', width: '100%', padding:'10px'}}>
                <DataGrid
                    rows={categoriePannes}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                />
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? 'Modifier' : 'Ajouter '} CategoriePanne</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Panne"
                        fullWidth
                        value={formData.panne}
                        onChange={(e) => setFormData({ ...formData, panne: e.target.value })}
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

export default CategoriePanneTable;
