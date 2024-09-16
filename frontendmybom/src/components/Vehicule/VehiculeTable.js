// // src/components/Vehicule/VehiculeTable.js
//
// import Home from '../Home/Home';
// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, Typography } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {
//     getVehicules,
//     createVehicule,
//     updateVehicule,
//     deleteVehicule,
//     deleteSecteur,
//     updateSecteur, createSecteur
// } from '../../services/api';
// import {frFR} from "@mui/x-data-grid/locales";
// import FlashMessage from '../FlashMessage/FlashMessage';
// import useFlashMessage from '../FlashMessage/useFlashMessage';
//
// const VehiculeTable = () => {
//     const [Vehicules, setVehicules] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({ code_vehicule: '', volume: '', numero_radio: '',kms_au_compteur: '', disponible: ''  });
//     const [editId, setEditId] = useState(null);
//     const { flashMessage, showFlashMessage, hideFlashMessage } = useFlashMessage();
//
//     useEffect(() => {
//         fetchVehicules();
//     }, []);
//
//     const fetchVehicules = async () => {
//         const response = await getVehicules();
//         setVehicules(response.data);
//     };
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//         setFormData({ code_vehicule: '', volume: '', numero_radio: '',kms_au_compteur: '', disponible: '' });
//         setEditId(null);
//     };
//
//     const handleSave = async () => {
//         try {
//             if (editId) {
//                 await updateVehicule(editId, formData);
//                 showFlashMessage("Mise à jour réussie", "success");
//             } else {
//                 await createVehicule(formData);
//                 showFlashMessage("Ajout réussi", "success");
//             }
//             fetchVehicules();
//             handleClose();
//         } catch (error) {
//             console.error("Erreur lors de la sauvegarde du véhicule:", error);
//             showFlashMessage("Erreur lors de la sauvegarde du véhicule", "error");
//         }
//     };
//
//     const handleEdit = (id) => {
//         const editItem = Vehicules.find((item) => item.id === id);
//         setFormData(editItem);
//         setEditId(id);
//         handleClickOpen();
//     };
//
//     const handleDelete = async (id) => {
//         try {
//
//             showFlashMessage("Suppression réussie", "success");
//             fetchVehicules();
//         } catch (error) {
//             console.error("Erreur lors de la suppression du vehicule:", error);
//             showFlashMessage("Erreur lors de la suppression du vehicule", "error");
//         }
//     };
//
//     const columns = [
//         { field: 'code_vehicule', headerName: 'Code', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
//         { field: 'volume', headerName: 'Volume', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
//         { field: 'numero_radio', headerName: 'N°Radio', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
//         { field: 'kms_au_compteur', headerName: 'Kms', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
//         { field: 'disponible', headerName: 'Dispo', flex: 1, minWidth: 150, renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>) },
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             width: 150,
//             renderHeader: (params) => (<strong>{params.colDef.headerName}</strong>),
//             renderCell: (params) => (
//                 <>
//                     <IconButton onClick={() => handleEdit(params.id)} color="primary">
//                         <EditIcon />
//                     </IconButton>
//                     <IconButton onClick={() => handleDelete(params.id)} color="secondary">
//                         <DeleteIcon />
//                     </IconButton>
//                 </>
//             ),
//         },
//     ];
//
//     return (
//         <Home>
//             <FlashMessage
//                 open={flashMessage.open}
//                 message={flashMessage.message}
//                 severity={flashMessage.severity}
//                 onClose={hideFlashMessage}
//             />
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h4">Liste des Vehicules</Typography>
//                 <Button
//                     variant="outlined"
//                     color="primary"
//                     onClick={handleClickOpen}
//                     startIcon={<AddIcon />}
//                 >
//                     Ajouter un nouveau Vehicule
//                 </Button>
//             </Box>
//             <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
//                 <DataGrid
//                     rows={Vehicules}
//                     columns={columns}
//                     pageSize={5}
//                     checkboxSelection
//                     disableSelectionOnClick
//                     localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
//                 />
//             </Box>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editId ? 'Modifier' : 'Ajouter '} Vehicule</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Code"
//                         fullWidth
//                         value={formData.code_vehicule}
//                         onChange={(e) => setFormData({ ...formData, code_vehicule: e.target.value })}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Volume"
//                         fullWidth
//                         value={formData.volume}
//                         onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="N°Radio"
//                         fullWidth
//                         value={formData.numero_radio}
//                         onChange={(e) => setFormData({ ...formData, numero_radio: e.target.value })}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Kms"
//                         fullWidth
//                         value={formData.kms_au_compteur}
//                         onChange={(e) => setFormData({ ...formData, kms_au_compteur: e.target.value })}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Dispo"
//                         fullWidth
//                         value={formData.disponible}
//                         onChange={(e) => setFormData({ ...formData, disponible: e.target.value })}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Retour
//                     </Button>
//                     <Button onClick={handleSave} color="primary">
//                         Sauvegarder
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Home>
//     );
// };
//
// export default VehiculeTable;
