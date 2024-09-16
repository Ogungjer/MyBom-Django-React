// src/components/Volume/VolumeTable.js

import Home from '../Home/Home';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    getVolumes,
    createVolume,
    updateVolume,
    deleteVolume,
} from '../../services/api';
import {frFR} from "@mui/x-data-grid/locales";
import FlashMessage from '../FlashMessage/FlashMessage';
import useFlashMessage from '../FlashMessage/useFlashMessage';

const VolumeTable = () => {
    const [volumes, setVolumes] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ volume: '' });
    const [editId, setEditId] = useState(null);
    const { flashMessage, showFlashMessage, hideFlashMessage } = useFlashMessage();

    useEffect(() => {
        fetchVolumes();
    }, []);

    const fetchVolumes = async () => {
        const response = await getVolumes();
        setVolumes(response.data);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ volume: '' });
        setEditId(null);
    };
    const handleSave = async () => {
        try {
            if (editId) {
                await updateVolume(editId, formData);
                showFlashMessage("Mise à jour réussie", "success");
            } else {
                await createVolume(formData);
                showFlashMessage("Ajout réussi", "success");
            }
            fetchVolumes();
            handleClose();
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du volume:", error);
            showFlashMessage("Erreur lors de la sauvegarde du volume", "error");
        }
    };

    const handleEdit = (id) => {
        const editItem = volumes.find((item) => item.id === id);
        setFormData(editItem);
        setEditId(id);
        handleClickOpen();
    };
    const handleDelete = async (id) => {
        try {
            await deleteVolume(id);
            showFlashMessage("Suppression réussie", "success");
            fetchVolumes();
        } catch (error) {
            console.error("Erreur lors de la suppression du volume:", error);
            showFlashMessage("Erreur lors de la suppression du volume", "error");
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>)},
        { field: 'volume', headerName: 'Volume', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>)},
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
                <Typography variant="h4">Liste des volumes</Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    startIcon={<AddIcon />}
                >
                    Ajouter un nouveau volume
                </Button>
            </Box>
            <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                <DataGrid
                    rows={volumes}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                />
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? 'Modifier' : 'Ajouter '} Volume</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Volume"
                        fullWidth
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
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

export default VolumeTable;
