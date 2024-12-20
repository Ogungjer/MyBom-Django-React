import Home from '../Home/Home';
import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { jsPDF } from "jspdf";
import 'chart.js/auto';
import {Button, Typography, Box, TextField, MenuItem} from '@mui/material';
import { getTournees, getVolumes } from '../../services/api';


const StatistiquesRapport = () => {
    const [date, setDate] = useState(new Date());
    const [periode, setPeriode] = useState('matin');
    const [rapportData, setRapportData] = useState(null);
    const [volumes, setVolumes] = useState([]);

    useEffect(() => {
        fetchVolumes();
        fetchData();
    }, [date, periode]);

    const fetchVolumes = async () => {
        try {
            const fetchedVolumes = await getVolumes();
            setVolumes(fetchedVolumes.data.map(v => v.volume));
        } catch (error) {
            console.error("Erreur lors de la récupération des volumes:", error);
            setVolumes([]);
        }
    };

    const fetchData = async () => {
        try {
            const formattedDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
            const tournees = await getTournees(formattedDate, periode);

            // Filter tournees by the selected period if not done on the API side
            const filteredTournees = tournees.data.filter(tournee => tournee.date=== formattedDate && tournee.periode_journee === periode);

            const data = processData(filteredTournees);
            setRapportData(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            setRapportData(null);
        }
    };


    const processData = (tournees) => {

        const data = {
            disponibles: {},
            enPanne: {},
            modeDégrade: {},
            nonUtilises: {},
            utilises: {},
            kmsParcourus: 0
        };

        volumes.forEach(vol => {
            data.disponibles[vol] = 0;
            data.enPanne[vol] = 0;
            data.modeDégrade[vol] = 0;
            data.nonUtilises[vol] = 0;
            data.utilises[vol] = 0;
        });

        tournees.forEach(tournee => {
            const volume = tournee.volume;
            if (tournee.disponible === 'oui') {
                data.disponibles[volume] = (data.disponibles[volume] || 0) + 1;
            }
            if (tournee.disponible === 'non') {
                data.enPanne[volume] = (data.enPanne[volume] || 0) + 1;
            }
            if (['autre volume', 'parti plus tard', 'pas sorti'].includes(tournee.mode_degrade)) {
                data.modeDégrade[volume] = (data.modeDégrade[volume] || 0) + 1;
            }
            if (tournee.kms_depart === tournee.kms_arrivee) {
                data.nonUtilises[volume] = (data.nonUtilises[volume] || 0) + 1;
            } else {
                data.utilises[volume] = (data.utilises[volume] || 0) + 1;
            }
            data.kmsParcourus += tournee.kms_parcourus || 0;
        });

        return data;
    };

    const genererPDF = () => {
        const doc = new jsPDF();

        let yOffset = 30;  // Initialize yOffset to manage vertical positioning

        // Titre
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 128);
        doc.text(`RAPPORT JOURNALIER`, 105, 15, null, null, 'center');
        doc.setFontSize(12);
        doc.text(`${date.toLocaleDateString()} - ${periode.toUpperCase()}`, 105, 22, null, null, 'center');

        // Function to create a section with dynamic positioning
        const creerSection = (titre, donnees, startY) => {
            const sectionHeight = Object.keys(donnees).length * 6 + 12; // Calculate section height dynamically

            // Check if new section will overflow the page, if so add a new page
            if (startY + sectionHeight > doc.internal.pageSize.height - 20) {
                doc.addPage();
                startY = 20;  // Reset startY for new page
            }

            doc.setFontSize(14);
            doc.setTextColor(255, 255, 255);
            doc.setFillColor(0, 0, 128);
            doc.rect(10, startY, 190, 7, 'F');
            doc.text(titre, 12, startY + 5);

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            let y = startY + 12;
            Object.entries(donnees).forEach(([key, value]) => {
                doc.text(`${key}`, 12, y);
                doc.text(`${value}`, 180, y, null, null, 'right');
                y += 6;
            });

            return y;  // Return the new y position after the section
        };

        // Generate sections
        yOffset = creerSection("Nombre de pannes", {
            "Total": Object.values(rapportData.enPanne).reduce((a, b) => a + b, 0),
            ...rapportData.enPanne
        }, yOffset + 10);

        yOffset = creerSection("Véhicules disponibles", {
            "Total": Object.values(rapportData.disponibles).reduce((a, b) => a + b, 0),
            ...rapportData.disponibles
        }, yOffset + 10);

        yOffset = creerSection("Véhicules utilisés", {
            "Total": Object.values(rapportData.utilises).reduce((a, b) => a + b, 0),
            ...rapportData.utilises
        }, yOffset + 10);

        yOffset = creerSection("Véhicules non utilisés", {
            "Total": Object.values(rapportData.nonUtilises).reduce((a, b) => a + b, 0),
            ...rapportData.nonUtilises
        }, yOffset + 10);

        yOffset = creerSection("Kms parcourus", {
            "Total": rapportData.kmsParcourus,
        }, yOffset + 10);

        yOffset = creerSection("Mode dégradé", {
            ...rapportData.modeDégrade
        }, yOffset + 10);

        // Save the PDF with dynamic content positioning
        doc.save(`rapport_journalier_${date.toISOString().split('T')[0]}_${periode}.pdf`);
    };


    if (!rapportData) return <div>Chargement des données...</div>;

    return (
        <Home>
            <Box>
                <Typography variant="h4">Rapport des Tournées</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="Date"
                        type="date"
                        value={date.toISOString().split('T')[0]}
                        onChange={(e) => setDate(new Date(e.target.value))}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        select
                        label="Période"
                        value={periode}
                        onChange={(e) => setPeriode(e.target.value)}
                    >
                        <MenuItem value="matin">Matin</MenuItem>
                        <MenuItem value="apres_midi">Après-midi</MenuItem>
                    </TextField>
                    <Button variant="contained" onClick={genererPDF}>Générer le rapport </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box className="chart-container" sx={{ width: '58%' }}>
                        <Typography variant="h6">Véhicules par statut et volume</Typography>
                        <Bar
                            data={{
                                labels: Object.keys(rapportData.disponibles),
                                datasets: [
                                    {
                                        label: 'Disponibles',
                                        data: Object.values(rapportData.disponibles),
                                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                    },
                                    {
                                        label: 'En panne',
                                        data: Object.values(rapportData.enPanne),
                                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                    },
                                    {
                                        label: 'Mode dégradé',
                                        data: Object.values(rapportData.modeDégrade),
                                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                                    },
                                    {
                                        label: 'Non utilisés',
                                        data: Object.values(rapportData.nonUtilises),
                                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                                    },
                                    {
                                        label: 'Utilisés',
                                        data: Object.values(rapportData.utilises),
                                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                    }
                                ]
                            }}
                        />
                    </Box>

                    <Box className="chart-container" sx={{ width: '28%' }}>
                        <Typography variant="h6">Kilométrage total parcouru</Typography>
                        <Pie
                            data={{
                                labels: ['Kms parcourus'],
                                datasets: [{
                                    data: [rapportData.kmsParcourus],
                                    backgroundColor: ['rgba(75, 192, 192, 0.6)'],
                                }]
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Home>
    );
};

export default StatistiquesRapport;