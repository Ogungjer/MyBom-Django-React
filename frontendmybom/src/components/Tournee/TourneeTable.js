import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    MenuItem,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {createTournees, getTournees, getVolumes, getConducteurs, getSecteurs, updateTournee, getRadios, deleteTournee } from '../../services/api';
import Home from '../Home/Home';
import EditIcon from "@mui/icons-material/Edit";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Menu from '@mui/material/Menu';
import { DataGrid } from '@mui/x-data-grid';
import { frFR } from '@mui/x-data-grid/locales';
import FlashMessage from '../FlashMessage/FlashMessage';
import useFlashMessage from '../FlashMessage/useFlashMessage';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const TourneeTable = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ date: '', periode: '' });
    const [tourneeRows, setTourneeRows] = useState([]);
    const [volumes, setVolumes] = useState([]);
    const [conducteurs, setConducteurs] = useState([]);
    const [radios, setRadios] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingTournee, setEditingTournee] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedPeriode, setSelectedPeriode] = useState('matin');
    const [anchorEl, setAnchorEl] = useState(null);
    const { flashMessage, showFlashMessage, hideFlashMessage } = useFlashMessage();
    const [addTourneeDialogOpen, setAddTourneeDialogOpen] = useState(false);
    const [newTournee, setNewTournee] = useState({
        date: selectedDate,
        periode_journee: selectedPeriode,
        code_vehicule: '',
        volume: '',
        heure_depart: null,
        kms_depart: '',
        conducteurs: '',
        secteur: '',
        heure_arrivee: null,
        kms_arrivee: '',
        observations: '',
        disponible: 'oui',
        mode_degrade: 'non',
        numero_radio: '',
    });

    useEffect(() => {
        fetchData();
        fetchTournees(selectedDate, selectedPeriode);
    }, []);

    const fetchData = async () => {
        const volumesRes = await getVolumes();
        const conducteursRes = await getConducteurs();
        const secteursRes = await getSecteurs();
        const radiosRes = await getRadios();
        setVolumes(volumesRes.data);
        setConducteurs(conducteursRes.data);
        setSecteurs(secteursRes.data);
        setRadios(radiosRes.data);
    };
    const handleExportClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleExportClose = () => {
        setAnchorEl(null);
    };

    const handleAddTourneeClick = () => {
        setAddTourneeDialogOpen(true);
    };

    const handleAddTourneeClose = () => {
        setAddTourneeDialogOpen(false);
        setNewTournee({
            date: selectedDate,
            periode_journee: selectedPeriode,
            code_vehicule: '',
            volume: '',
            heure_depart: '',
            kms_depart: '',
            conducteurs: '',
            secteur: '',
            heure_arrivee: '',
            kms_arrivee: '',
            observations: '',
            disponible: 'oui',
            mode_degrade: 'non',
            numero_radio: '',
        });
    };

    const handleAddTourneeSave = async () => {
        try {
            const response = await createTournees([newTournee]);
            showFlashMessage("Nouvelle tournée ajoutée avec succès", "success");
            fetchTournees(selectedDate, selectedPeriode);
            handleAddTourneeClose();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tournée:', error);
            showFlashMessage("Erreur lors de l'ajout de la tournée", "error");
        }
    };

    const handleNewTourneeChange = (field, value) => {
        setNewTournee(prev => ({ ...prev, [field]: value }));
    };

    const fetchTournees = async (date = selectedDate, periode = selectedPeriode) => {
        try {
            const response = await getTournees(date, periode);
            // Filtrer les données côté client pour plus de sécurité
            const filteredData = response.data.filter(tournee =>
                tournee.date === date && tournee.periode_journee === periode
            );
            setTourneeRows(filteredData);
        } catch (error) {
            console.error('Erreur lors de la récupération des tournées:', error);
            showFlashMessage("Erreur lors de la récupération du tournées", "error");
        }
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setEditingTournee(null);
    };

    const handleEditClick = (tournee) => {
        setEditingTournee(tournee);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (tournee) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer cette tournée du ${tournee.date} (${tournee.periode_journee}) ?`)) {
            deleteTourneeFromTable(tournee.id);
        }
    };

    const deleteTourneeFromTable = async (id) => {
        try {
            await deleteTournee(id);
            showFlashMessage("Tournée supprimée avec succès", "success");
            fetchTournees(selectedDate, selectedPeriode);
        } catch (error) {
            console.error('Erreur lors de la suppression de la tournée:', error);
            showFlashMessage("Erreur lors de la suppression de la tournée", "error");
        }
    };


    const handleEditSave = async () => {
        try {
            await updateTournee(editingTournee.id, editingTournee);
            showFlashMessage("Mise à jour réussie", "success");
            fetchTournees(); // Rafraîchir les données après la mise à jour
            handleEditClose();
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tournée:', error);
            showFlashMessage("Erreur lors de la mise jour de la tournée", "error");
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ date: '', periode: '' });
    };

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setFormData(prev => ({ ...prev, date: newDate }));
        setSelectedDate(newDate);
        fetchTournees(newDate, selectedPeriode);
    };

    const handlePeriodeChange = (event) => {
        const newPeriode = event.target.value;
        setFormData(prev => ({ ...prev, periode: newPeriode }));
        setSelectedPeriode(newPeriode);
        fetchTournees(selectedDate, newPeriode);
    };



    const handleGenerate = async () => {
        try {
            const selectedDate = new Date(formData.date);
            const selectedPeriode = formData.periode;

            // Récupérer toutes les tournées
            const allTourneesResponse = await getTournees();
            const allTournees = allTourneesResponse.data;

            // Trier les tournées par date et période, du plus récent au plus ancien
            const sortedTournees = allTournees.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (dateB - dateA !== 0) return dateB - dateA;
                return b.periode_journee === 'apres_midi' ? 1 : -1;
            });

            // Trouver la dernière tournée effectuée
            const lastTournee = sortedTournees.find(
                (tournee) =>
                    new Date(tournee.date) < selectedDate ||
                    (new Date(tournee.date).getTime() === selectedDate.getTime() &&
                        tournee.periode_journee !== selectedPeriode)
            );

            if (!lastTournee) {
                throw new Error("Aucune tournée antérieure trouvée pour la copie.");
            }

            // Récupérer toutes les lignes de la dernière tournée
            const lastTourneeLines = sortedTournees.filter(
                (tournee) =>
                    new Date(tournee.date).getTime() === new Date(lastTournee.date).getTime() &&
                    tournee.periode_journee === lastTournee.periode_journee
            );

            // Créer les nouvelles tournées basées sur la dernière tournée
            const newTournees = lastTourneeLines.map((tournee) => ({
                ...tournee,
                id: undefined, // Retirer l'id pour que la base de données en génère un nouveau
                date: formData.date,
                periode_journee: formData.periode,
                // Réinitialiser les champs qui doivent être mis à jour
                heure_depart: null,
                heure_arrivee: null,
                conducteurs: null,
                kms_depart : tournee.kms_arrivee,
                secteur: null,
                kms_parcourus: 0,
                temps_travail: 0,
                vitesse_moyenne: 0,
                mode_degrade: 'non', // Supposons que par défaut, il n'y a pas de mode dégradé
            }));

            // Créer les nouvelles tournées dans la base de données
            await createTournees(newTournees);

            // Mettre à jour les états avec les nouvelles valeurs
            setSelectedDate(formData.date);
            setSelectedPeriode(formData.periode);

            // Rafraîchir les données affichées
            await fetchTournees(formData.date, formData.periode);

            showFlashMessage(
                `${newTournees.length} nouvelles tournées ont été créées avec succès, basées sur les tournées du ${lastTournee.date} (${lastTournee.periode_journee}).`,
                "success"
            );
        } catch (error) {
            console.error('Erreur lors de la création des tournées:', error);
            showFlashMessage("Erreur lors de la création des tournées: " + error.message, "error");
        }
        handleClose();
    };


    const handleCellEditCommit = async (params) => {
        const updatedRows = [...tourneeRows];
        const index = updatedRows.findIndex((row) => row.id === params.id);
        const field = params.field;
        let value = params.value;

        updatedRows[index] = { ...updatedRows[index], [field]: value };

        if (field === 'kms_depart' || field === 'kms_arrivee') {
            value = value ? value + ':00' : null
            const kms_depart = parseInt(updatedRows[index].kms_depart) || 0;
            const kms_arrivee = parseInt(updatedRows[index].kms_arrivee) || 0;
            updatedRows[index].kms_parcourus = kms_arrivee - kms_depart;
        }

        if (field === 'heure_depart' || field === 'heure_arrivee' || field === 'kms_parcourus') {
            const heure_depart = updatedRows[index].heure_depart ? new Date(`1970-01-01T${updatedRows[index].heure_depart}`) : null;
            const heure_arrivee = updatedRows[index].heure_arrivee ? new Date(`1970-01-01T${updatedRows[index].heure_arrivee}`) : null;

            if (heure_depart && heure_arrivee) {
                let diffMs = heure_arrivee - heure_depart;

                // Gérer le cas où l'heure d'arrivée est le jour suivant
                if (diffMs < 0) {
                    diffMs += 24 * 60 * 60 * 1000; // Ajouter 24 heures en millisecondes
                }

                const diffHours = diffMs / 3600000; // Convertir les millisecondes en heures

                // Formater le temps de travail en HH:MM:SS
                const hours = Math.floor(diffHours);
                const minutes = Math.floor((diffHours - hours) * 60);
                const seconds = Math.floor(((diffHours - hours) * 60 - minutes) * 60);
                updatedRows[index].temps_travail =
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                // Calculer la vitesse moyenne
                const kms_parcourus = parseFloat(updatedRows[index].kms_parcourus) || 0;
                updatedRows[index].vitesse_moyenne = diffHours > 0 ? (kms_parcourus / diffHours).toFixed(2) : 0;
            } else {
                // Réinitialiser les valeurs si l'une des heures est manquante
                updatedRows[index].temps_travail = null;
                updatedRows[index].vitesse_moyenne = 0;
            }
        }

        setTourneeRows(updatedRows);

        try {
            await updateTournee(params.id, { [params.field]: params.value });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tournée:', error);
        }
    };
    const handleEditFieldChange = (field, value) => {
        setEditingTournee(prev => {
            const updatedTournee = { ...prev, [field]: value };

            // Calculer kms_parcourus
            if (field === 'kms_depart' || field === 'kms_arrivee') {
                const kms_depart = parseFloat(updatedTournee.kms_depart) || 0;
                const kms_arrivee = parseFloat(updatedTournee.kms_arrivee) || 0;
                updatedTournee.kms_parcourus = kms_arrivee - kms_depart;
            }

            // Calculer temps_travail et vitesse_moyenne
            if (field === 'heure_depart' || field === 'heure_arrivee' || field === 'kms_parcourus') {
                const heure_depart = updatedTournee.heure_depart ? new Date(`1970-01-01T${updatedTournee.heure_depart}`) : null;
                const heure_arrivee = updatedTournee.heure_arrivee ? new Date(`1970-01-01T${updatedTournee.heure_arrivee}`) : null;

                if (heure_depart && heure_arrivee) {
                    let diffMs = heure_arrivee - heure_depart;

                    // Gérer le cas où l'heure d'arrivée est le jour suivant
                    if (diffMs < 0) {
                        diffMs += 24 * 60 * 60 * 1000; // Ajouter 24 heures en millisecondes
                    }

                    const diffHours = diffMs / 3600000; // Convertir les millisecondes en heures

                    // Formater le temps de travail en HH:MM:SS
                    const hours = Math.floor(diffHours);
                    const minutes = Math.floor((diffHours - hours) * 60);
                    const seconds = Math.floor(((diffHours - hours) * 60 - minutes) * 60);
                    updatedTournee.temps_travail =
                        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                    // Calculer la vitesse moyenne
                    const kms_parcourus = parseFloat(updatedTournee.kms_parcourus) || 0;
                    updatedTournee.vitesse_moyenne = diffHours > 0 ? (kms_parcourus / diffHours).toFixed(2) : 0;
                } else {
                    // Réinitialiser les valeurs si l'une des heures est manquante
                    updatedTournee.temps_travail = null;
                    updatedTournee.vitesse_moyenne = 0;
                }
            }

            return updatedTournee;
        });
    };

    const columns = [
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>),
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEditClick(params.row)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(params.row)} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
        { field: 'date', headerName: 'Date', width: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'periode_journee', headerName: 'Période', width: 80, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        {
            field: 'code_vehicule',
            headerName: 'Code',
            width: 120,
            renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>),
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {params.row.disponible === 'oui' ? (
                        <NoCrashIcon color="success" sx={{ mr: 1 }} />
                    ) : params.row.disponible === 'non' ? (
                        <CarCrashIcon color="error" sx={{ mr: 1 }} />
                    ) : null}
                    {params.value}
                </Box>
            ),
        },
        { field: 'volume', headerName: 'Vol', width: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'heure_depart', headerName: 'H.Départ', width: 100, type: 'time', renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'kms_depart', headerName: 'Kms Départ', width: 100, type: 'number', renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'conducteurs', headerName: 'Conducteurs', width: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'secteur', headerName: 'Secteur', width: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'heure_arrivee', headerName: 'H.Arrivée', width: 100, type: 'time', renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'kms_arrivee', headerName: 'Kms Arrivée', width: 100, type: 'number', renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'observations', headerName: 'Observations', width: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        {field: 'disponible', headerName: 'Dispo', width: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>)},
        { field: 'mode_degrade', headerName: 'Mode Dégradé', width: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'numero_radio', headerName: 'N°Radio', width: 100, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'kms_parcourus', headerName: 'Kms Parcourus', width: 100, type: 'number', editable: false, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'temps_travail', headerName: 'Tmps Travail', width: 100, editable: false, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
        { field: 'vitesse_moyenne', headerName: 'Vitesse Moy', width: 80, type: 'number', editable: false, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
    ];
    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(tourneeRows);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Tournées");
        XLSX.writeFile(workbook, `Tournees_${selectedDate}_${selectedPeriode}.xlsx`);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [columns.map(col => col.headerName)],
            body: tourneeRows.map(row => columns.map(col => row[col.field])),
        });
        doc.save(`Tournees_${selectedDate}_${selectedPeriode}.pdf`);
    };

    return (
        <Home>
            <FlashMessage
                open={flashMessage.open}
                message={flashMessage.message}
                severity={flashMessage.severity}
                onClose={hideFlashMessage}
            />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    label="Date"
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    select
                    label="Période"
                    value={selectedPeriode}
                    onChange={handlePeriodeChange}
                >
                    <MenuItem value="matin">Matin</MenuItem>
                    <MenuItem value="apres_midi">Après-midi</MenuItem>
                </TextField>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Gestion des tournées</Typography>
                <Box>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClickOpen}
                        startIcon={<AddIcon />}
                        sx={{ mr: 2 }}
                    >
                        Créer une feuille de tournée
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddTourneeClick}
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{ mr: 2 }}
                    >
                        Ajouter une tournée
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleExportClick}
                        startIcon={<FileDownloadIcon />}
                    >
                        Exporter
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleExportClose}
                    >
                        <MenuItem onClick={() => { exportToExcel(); handleExportClose(); }}>Exporter en Excel</MenuItem>
                        <MenuItem onClick={() => { exportToPDF(); handleExportClose(); }}>Exporter en PDF</MenuItem>
                    </Menu>
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Créer une feuille de tournée</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Date"
                        fullWidth
                        type="date"
                        value={formData.date}
                        onChange={handleDateChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Période"
                        fullWidth
                        value={formData.periode}
                        onChange={handlePeriodeChange}
                        InputLabelProps={{ shrink: true }}
                    >
                        <MenuItem value="matin">Matin</MenuItem>
                        <MenuItem value="apres_midi">Après-midi</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Retour
                    </Button>
                    <Button onClick={handleGenerate} color="primary">
                        Créer
                    </Button>
                </DialogActions>

            </Dialog>
            {/* Dialogue d'édition */}
            <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
                <DialogTitle>Modifier la tournée</DialogTitle>
                <DialogContent>
                    {editingTournee && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Date"
                                type="date"
                                value={editingTournee.date}
                                onChange={(e) => handleEditFieldChange('date', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                select
                                label="Période"
                                value={editingTournee.periode_journee}
                                onChange={(e) => handleEditFieldChange('periode_journee', e.target.value)}
                            >
                                <MenuItem value="matin">Matin</MenuItem>
                                <MenuItem value="apres_midi">Après-midi</MenuItem>
                            </TextField>

                            <TextField
                                label="Code véhicule"
                                value={editingTournee.code_vehicule}
                                onChange={(e) => handleEditFieldChange('code_vehicule', e.target.value)}
                            />
                            <TextField
                                select
                                label="Volume"
                                value={editingTournee.volume}
                                onChange={(e) => handleEditFieldChange('volume', e.target.value)}
                            >
                                {volumes.map((volume) => (
                                    <MenuItem key={volume.id} value={volume.volume}>
                                        {volume.volume}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Heure de départ"
                                type="time"
                                value={editingTournee.heure_depart}
                                onChange={(e) => handleEditFieldChange('heure_depart', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Kms départ"
                                type="number"
                                value={editingTournee.kms_depart}
                                onChange={(e) => handleEditFieldChange('kms_depart', e.target.value)}
                            />


                            <TextField
                                select
                                label="Conducteurs"
                                value={editingTournee.conducteurs}
                                onChange={(e) => handleEditFieldChange('conducteurs', e.target.value)}
                            >
                                {conducteurs.map((conducteur) => (
                                    <MenuItem key={conducteur.id} value={conducteur.nom}>
                                        {conducteur.nom}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select
                                label="Secteur"
                                value={editingTournee.secteur}
                                onChange={(e) => handleEditFieldChange('secteur', e.target.value)}
                            >
                                {secteurs.map((secteur) => (
                                    <MenuItem key={secteur.id} value={secteur.nom}>
                                        {secteur.nom}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Heure d'arrivée"
                                type="time"
                                value={editingTournee.heure_arrivee}
                                onChange={(e) => handleEditFieldChange('heure_arrivee', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                label="Kms arrivée"
                                type="number"
                                value={editingTournee.kms_arrivee}
                                onChange={(e) => handleEditFieldChange('kms_arrivee', e.target.value)}
                            />
                            <TextField
                                label="Observations"
                                multiline
                                rows={4}
                                value={editingTournee.observations}
                                onChange={(e) => handleEditFieldChange('observations', e.target.value)}
                            />
                            <TextField
                                select
                                label="Disponible"
                                value={editingTournee.disponible}
                                onChange={(e) => handleEditFieldChange('disponible', e.target.value)}
                            >
                                <MenuItem value="oui">Oui</MenuItem>
                                <MenuItem value="non">Non</MenuItem>
                            </TextField>

                            <TextField
                                select
                                label="Mode dégradé"
                                value={editingTournee.mode_degrade}
                                onChange={(e) => handleEditFieldChange('mode_degrade', e.target.value)}
                            >
                                <MenuItem value="non">Non</MenuItem>
                                <MenuItem value="autre volume">Autre volume</MenuItem>
                                <MenuItem value="parti plus tard">Parti plus tard</MenuItem>
                                <MenuItem value="pas sorti">Pas sorti</MenuItem>

                            </TextField>
                            <TextField
                                select
                                label="Numéro radio"
                                value={editingTournee.numero_radio}
                                onChange={(e) => handleEditFieldChange('numero_radio', e.target.value)}
                            >
                                {radios.map((radio) => (
                                    <MenuItem key={radio.id} value={radio.numero}>
                                        {radio.numero}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/*<TextField*/}
                            {/*    label="Numéro radio"*/}
                            {/*    value={editingTournee.numero_radio}*/}
                            {/*    onChange={(e) => handleEditFieldChange('numero_radio', e.target.value)}*/}
                            {/*/>*/}
                            <TextField
                                label="Kms parcourus"
                                type="number"
                                value={editingTournee.kms_parcourus}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                label="Temps de travail"
                                value={editingTournee.temps_travail}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                label="Vitesse moyenne"
                                type="number"
                                value={editingTournee.vitesse_moyenne}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleEditSave} color="primary">
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Dialog>

            {/*Dialogue d'ajout*/}

            <Dialog open={addTourneeDialogOpen} onClose={handleAddTourneeClose} maxWidth="md" fullWidth>
                <DialogTitle>Ajouter une nouvelle tournée</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            label="Date"
                            type="date"
                            value={newTournee.date}
                            onChange={(e) => handleNewTourneeChange('date', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            select
                            label="Période"
                            value={newTournee.periode_journee}
                            onChange={(e) => handleNewTourneeChange('periode_journee', e.target.value)}
                        >
                            <MenuItem value="matin">Matin</MenuItem>
                            <MenuItem value="apres_midi">Après-midi</MenuItem>
                        </TextField>

                        <TextField
                            label="Code véhicule"
                            value={newTournee.code_vehicule}
                            onChange={(e) => handleNewTourneeChange('code_vehicule', e.target.value)}
                        />
                        <TextField
                            select
                            label="Volume"
                            value={newTournee.volume}
                            onChange={(e) => handleNewTourneeChange('volume', e.target.value)}
                        >
                            {volumes.map((volume) => (
                                <MenuItem key={volume.id} value={volume.volume}>
                                    {volume.volume}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Heure de départ"
                            type="time"
                            value={newTournee.heure_depart}
                            onChange={(e) => handleNewTourneeChange('heure_depart', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Kms départ"
                            type="number"
                            value={newTournee.kms_depart}
                            onChange={(e) => handleNewTourneeChange('kms_depart', e.target.value)}
                        />
                        <TextField
                            select
                            label="Conducteurs"
                            value={newTournee.conducteurs}
                            onChange={(e) => handleNewTourneeChange('conducteurs', e.target.value)}
                        >
                            {conducteurs.map((conducteur) => (
                                <MenuItem key={conducteur.id} value={conducteur.nom}>
                                    {conducteur.nom}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Secteur"
                            value={newTournee.secteur}
                            onChange={(e) => handleNewTourneeChange('secteur', e.target.value)}
                        >
                            {secteurs.map((secteur) => (
                                <MenuItem key={secteur.id} value={secteur.nom}>
                                    {secteur.nom}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Heure d'arrivée"
                            type="time"
                            value={newTournee.heure_arrivee}
                            onChange={(e) => handleNewTourneeChange('heure_arrivee', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            label="Kms arrivée"
                            type="number"
                            value={newTournee.kms_arrivee}
                            onChange={(e) => handleNewTourneeChange('kms_arrivee', e.target.value)}
                        />
                        <TextField
                            label="Observations"
                            multiline
                            rows={4}
                            value={newTournee.observations}
                            onChange={(e) => handleNewTourneeChange('observations', e.target.value)}
                        />
                        <TextField
                            select
                            label="Disponible"
                            value={newTournee.disponible}
                            onChange={(e) => handleNewTourneeChange('disponible', e.target.value)}
                        >
                            <MenuItem value="oui">Oui</MenuItem>
                            <MenuItem value="non">Non</MenuItem>
                        </TextField>

                        <TextField
                            select
                            label="Mode dégradé"
                            value={newTournee.mode_degrade}
                            onChange={(e) => handleNewTourneeChange('mode_degrade', e.target.value)}
                        >
                            <MenuItem value="non">Non</MenuItem>
                            <MenuItem value="autre volume">Autre volume</MenuItem>
                            <MenuItem value="parti plus tard">Parti plus tard</MenuItem>
                            <MenuItem value="pas sorti">Pas sorti</MenuItem>

                        </TextField>
                        <TextField
                            label="Numéro radio"
                            value={newTournee.numero_radio}
                            onChange={(e) => handleNewTourneeChange('numero_radio', e.target.value)}
                        />
                        <TextField
                            label="Kms parcourus"
                            type="number"
                            value={newTournee.kms_parcourus}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            label="Temps de travail"
                            value={newTournee.temps_travail}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            label="Vitesse moyenne"
                            type="number"
                            value={newTournee.vitesse_moyenne}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddTourneeClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleAddTourneeSave} color="primary">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={tourneeRows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onCellEditCommit={handleCellEditCommit}
                    localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                />
            </Box>
        </Home>
    );
};

export default TourneeTable;