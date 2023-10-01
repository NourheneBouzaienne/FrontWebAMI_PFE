/* eslint-disable */

import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Select,
    MenuItem,
    Fab,
    TableContainer,
    TextField,
    Alert
} from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InfoIcon from '@mui/icons-material/Info';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IconButton from '@mui/material/IconButton';

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import { DailyActivities } from "../dashboards/dashboard1-components";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { format } from "date-fns";
import { DevicesFoldSharp } from "@mui/icons-material";
import AddHomeWorkOutlinedIcon from '@mui/icons-material/AddHomeWorkOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';

function GarantiesList() {
    const [devis, setDevis] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [selectedClientId, setSelectedClientId] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddClient, setShowAddClient] = useState(false);
    const [selectedSinistre, setSelectedSinistre] = useState(null);
    const [openCard, setOpenCard] = useState(false);

    const [selectedDevis, setSelectedDevis] = useState(null);
    const [emailContent, setEmailContent] = useState("");
    const [showAlert, setShowAlert] = useState(false);


    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page
    useEffect(() => {
        fetchDevis();
    }, [page]);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };


    const handleOpenDetailsDialog = () => {
        setOpenDetailsDialog(true);
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
    };
    const handleOpenUpdateForm = (clientId) => {
        setSelectedClientId(clientId);
        setShowUpdateForm(true);
    };

    const handleCloseUpdateDialog = () => {
        setShowUpdateForm(false);
    };

    const handleViewDetails = (sinistreId) => {
        fetchSinistresDetails(sinistreId);
        handleOpenDetailsDialog();
    };

    const handleSubmit = () => {
        // Add the logic to gather form data and call the updateClient method
        // For example, you can create an object with the form data and call updateClient(selectedClientId, formData)
        // Replace "formData" with the actual data from the form
        // Don't forget to set setShowUpdateForm(false) to close the form after submission
    };


    const fetchSinistresDetails = async (sinistreId) => {
        try {
            const response = await axios.get(
                `http://localhost:8060/api/Gestionnaire/sinistre/${sinistreId}`, {
                headers: {
                    Authorization: token,
                },
            });
            console.log(token)
            setSelectedSinistre(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails du client :', error);
        }
    };

    const handleOpenAddClient = () => {
        setShowAddClient(true);
    };

    const handleCloseAddClient = () => {
        setShowAddClient(false);
    };

    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    const refreshSinistresList = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8060/api/Gestionnaire/sinistres",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            // Slice the sinistres data based on the calculated indices
            const slicedSinistres = response.data.slice(startIndex, endIndex);

            setSinistres(slicedSinistres);
        } catch (error) {
            console.error("Error fetching Sinistress:", error);
        }
    };
    const fetchDevis = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            return null;
        }
        try {
            const response = await axios.get(
                "http://localhost:8060/api/DemandeGarantie/Garanties", {
                headers: {
                    Authorization: token,
                },
            });


            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            const slicedDevis = response.data.slice(startIndex, endIndex);

            setDevis(slicedDevis);

        } catch (error) {
            console.error("Error fetching Devis:", error);
        }
    };

    const handleRetrieveGaranties = async (devisId) => {
        try {
            const response = await axios.get(
                `http://localhost:8060/api/Gestionnaire/devis/${devisId}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setSelectedDevis(response.data);

        } catch (error) {
            console.error("Error retrieving garanties :", error);
        }
    };

    /* const generateEmailContent = () => {
        // Customize the email content based on the selected pack, type occupant, and selectedDevis
        const packInfo = selectedDevis?.pack ? `pack: ${selectedDevis.pack.type}` : '';
        const typeOccupantInfo = selectedDevis?.typeOccupant ? `type Occupant: ${selectedDevis.typeOccupant.nom}` : '';


        return `Vous avez choisi le  ${packInfo}  pour un ${typeOccupantInfo} pour le produit Multirisque Habitation le montant total en TTC est :`;
    }; */
    const sendEmail = () => {
        // Check if selectedDevis is not null before accessing its properties
        if (selectedDevis && selectedDevis.user) {
            const emailRequest = {
                email: selectedDevis.user.email,
                name: selectedDevis.user.name,
                subject: selectedDevis.catégorie,
                content: emailContent,
                packType: selectedDevis.pack.type,
                typeOccupantNom: selectedDevis.typeOccupant.nom,
            };

            axios.post("http://localhost:8060/api/Gestionnaire/sendEmail", emailRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    console.log("E-mail envoyé avec succès !");
                    setShowAlert(true);
                })
                .catch((error) => {
                    console.error("Erreur lors de l'envoi de l'e-mail :", error);
                });
        }
    };

    const handleOpenCard = (devis) => {
        handleRetrieveGaranties(devis.id);
        setOpenCard(true);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    /*  const handleCloseDialog = () => {
         setOpenDialog(false);
     }; */
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEmailContent(""); // Réinitialiser le contenu de l'e-mail lorsque la boîte de dialogue est fermée
    };



    const handleSendEmail = (devis) => {
        setSelectedDevis(devis);
        if (devis && devis.user && devis.user.email) {
            // Définir le devis sélectionné pour l'envoi de l'e-mail
            setSelectedDevis(devis);
            // Ouvrir la boîte de dialogue pour l'envoi de l'e-mail
            handleOpenDialog();
        } else {
            // Handle the case when selectedDevis or its properties are null
            console.error("Selected devis or user email is null.");
        }
    };

    return (
        <Box >

            <Box display="flex" justifyContent="flex-end">
                <Fab
                    color="primary"
                    sx={{
                        mr: 1,
                        mb: {
                            xs: 1,
                            sm: 0,
                            lg: 0,
                        },
                    }}

                >
                    <AddToPhotosOutlinedIcon />
                </Fab>
            </Box>

            <Card variant="outlined">

                <CardContent>

                    <Typography variant="h3">Liste des demandes de devis </Typography>
                    <Box
                        sx={{
                            overflow: {
                                xs: "auto",
                                sm: "unset",
                            },
                        }}
                    >


                        <Table
                            aria-label="simple table"
                            sx={{
                                mt: 3,
                                whiteSpace: "nowrap",
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Id
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Garantie
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Client
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Numéro contrat
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        <Typography color="textSecondary" variant="h6">
                                            Actions
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {devis.map((devis) => (
                                    <TableRow key={devis.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {devis.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {devis.garantie}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        {devis.user.username}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: "600",
                                                        }}
                                                    >

                                                        {devis.numCNT}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>





                                        <TableCell align="right">

                                            <Fab
                                                color="secondary"
                                                size="small"
                                                sx={{
                                                    mr: 1,
                                                    mb: {
                                                        xs: 0,
                                                        sm: 1,
                                                        lg: 0,
                                                    },
                                                    marginLeft: 2
                                                }}
                                                onClick={() => handleSendEmail(devis)}
                                            >
                                                <ForwardToInboxOutlinedIcon />
                                            </Fab>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>


            <Dialog open={openDialog} onClose={handleCloseDialog} maxHeight="md">
                <DialogTitle>Envoyer un e-mail</DialogTitle>
                <DialogContent sx={{ height: "100%" }}>
                    <TextField
                        label="Adresse e-mail"
                        fullWidth
                        value={selectedDevis?.user?.email || ''} // Add the conditional check here
                        disabled
                        sx={{ marginBottom: 2, marginTop: 2 }}
                    />
                    <TextField
                        label="Montant à payer"
                        variant="outlined"
                        fullWidth
                        type="number" // Indique que l'entrée doit être un nombre
                        inputProps={{ inputMode: 'numeric' }}
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button
                        onClick={sendEmail}
                        color="primary"
                        disabled={!emailContent}
                    >
                        Envoyer
                    </Button>
                </DialogActions>
                {showAlert && (
                    <Alert severity="success" onClose={() => setShowAlert(false)}>
                        E-mail envoyé avec succès !
                    </Alert>
                )}
            </Dialog>

            <Dialog
                open={openCard}
                onClose={() => setOpenCard(false)}
                maxWidth="md" // Set the maximum width of the dialog
                fullWidth // Make the dialog take up the full width of the screen
            >
                <DialogTitle>Garanties</DialogTitle>
                <DialogContent sx={{ width: 'auto', textAlign: "center" }}>
                    {selectedDevis && (
                        <Box>


                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: '#ed3026' }}>Catégorie</Typography></TableCell>
                                            <TableCell> <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: '#ed3026' }}>Nom</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedDevis.pack.garantiesParametrage.map((garantie, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{garantie.categorie}</TableCell>
                                                <TableCell>{garantie.nom}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCard(false)}>Fermer</Button>
                </DialogActions>
            </Dialog>

            {/* Pagination controls */}
            <Box display="flex" justifyContent="center" my={2}>

                <Button>Previous</Button>

                <Fab
                    color="primary"
                    size="small" // Set the size to "small"
                    sx={{
                        mr: 1,
                        mb: {
                            xs: 1,
                            sm: 0,
                            lg: 0,
                        },


                    }}
                    onClick={handlePreviousPage} disabled={page === 1}
                >
                    <ArrowBackIosNewOutlinedIcon />
                </Fab>

                <Fab
                    color="primary"
                    size="small" // Set the size to "small"
                    sx={{
                        mr: 1,
                        mb: {
                            xs: 1,
                            sm: 0,
                            lg: 0,
                        },


                    }}
                    onClick={handleNextPage} disabled={devis.length < itemsPerPage}
                >
                    <ArrowForwardIosIcon />
                </Fab>




                <Button>Next</Button>
            </Box>



        </Box>
    );
}


export default GarantiesList