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
    Grid
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
import SinistreDetails from "./SinistreDetails";
import SinistresChart from "./SinistresChart";
import SinistresByTypeChart from "./SinistresByTypeChart";


function SinistresList() {
    const [sinistres, setSinistres] = useState([]);
    const [sinistresList, setSinistresList] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [selectedClientId, setSelectedClientId] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddClient, setShowAddClient] = useState(false);
    const [selectedSinistre, setSelectedSinistre] = useState(null);
    const [openCard, setOpenCard] = useState(false);

    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page
    useEffect(() => {
        fetchSinistres();
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
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };
    const handleDeleteSinistre = async (sinistreId) => {

        try {
            // Make an API call to delete the client
            await axios.delete(`http://localhost:8060/api/Gestionnaire/deleteSinistre/${sinistreId}`, {
                headers: {
                    Authorization: token,
                },
            });

            console.log(`Sinistre with ID ${sinistreId} deleted successfully.`);
            // Call the function to refresh the client list after successful deletion
            refreshSinistresList();
        } catch (error) {
            console.error(`Error deleting sinistre with ID ${sinistreId}:`, error);
        }
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
    const fetchSinistres = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            return null;
        }
        try {
            const response = await axios.get(
                "http://localhost:8060/api/Gestionnaire/sinistres", {
                headers: {
                    Authorization: token,
                },
            });


            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            // Slice the sinistres data based on the calculated indices
            const slicedSinistres = response.data.slice(startIndex, endIndex);

            setSinistres(slicedSinistres);
            setSinistresList(response.data)
        } catch (error) {
            console.error("Error fetching CLIENTS:", error);
        }
    };

    const handleRetrievePhotos = async (sinistreId) => {
        try {
            const response = await axios.get(
                `http://localhost:8060/api/Gestionnaire/sinistre/${sinistreId}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setSelectedSinistre(response.data);
            console.log("Constat Photos:", response.data);
        } catch (error) {
            console.error("Error retrieving Constat photos:", error);
        }
    };
    const handleOpenCard = (sinistre) => {
        handleRetrievePhotos(sinistre.id);
        setOpenCard(true);
    };

    return (
        <><Box>

            {/*  <Box display="flex" justifyContent="flex-end">
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
    </Box> */}

            <Card variant="outlined">

                <CardContent>

                    <Typography variant="h3">Liste des sinsitres </Typography>
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
                                            Client
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Date
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
                                {sinistres.map((sinistre) => (
                                    <TableRow key={sinistre.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {sinistre.id}
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
                                                        {sinistre.user.username}
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
                                                        {formatDate(sinistre.date)}
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
                                                        {sinistre.numCnt}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>


                                        {/* <TableCell>
                <Chip
                    sx={{
                        pl: "4px",
                        pr: "4px",
                        backgroundColor: (() => {
                            if (client.enabled == 0) {
                                return "#ed3026";
                            } else if (client.enabled == 1) {
                                return "primary.main";
                            } else {
                                return "black";
                            }
                        })(),
                        color: "#fff",
                    }}
                    size="small"
                    label={client.enabled == 1 ? "Enabled" : "Disabled"}
                />
            </TableCell> */}

                                        <TableCell align="right">

                                            <Button variant="outlined" onClick={() => handleOpenCard(sinistre)}>
                                                Afficher les photos
                                            </Button>

                                            <Fab
                                                color="primary"
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
                                                onClick={() => handleViewDetails(sinistre.id)}
                                            >
                                                <InfoIcon />
                                            </Fab>
                                            <Fab
                                                color='secondary'
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
                                                onClick={() => handleDeleteSinistre(sinistre.id)}
                                            >
                                                <DeleteOutlineIcon htmlColor='white' />
                                            </Fab>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>

            <Dialog sx={{ textAlign: "left" }} open={showUpdateForm} onClose={handleCloseUpdateDialog}>
                <DialogContent sx={{ textAlign: "left", overflowX: "auto" }}>
                    {selectedClient ? (
                        <UpdateClient
                            selectedClient={selectedClient}
                            setSelectedClient={setSelectedClient}
                            refreshClientList={refreshClientList}
                            handleCloseUpdateDialog={handleCloseUpdateDialog} />
                    ) : (
                        <Typography>Aucun client  sélectionné.</Typography>
                    )}                </DialogContent>
                <DialogActions>


                    <Fab
                        color="primary"
                        variant="extended"
                        sx={{
                            mr: 1,
                            mb: {
                                xs: 1,
                                sm: 0,
                                lg: 0,
                            },
                        }}
                    >
                        <HighlightOffOutlinedIcon />
                        <Typography
                            sx={{
                                ml: 1,
                                textTransform: "capitalize",
                            }}
                            onClick={handleCloseUpdateDialog}
                        >
                            Fermer
                        </Typography>
                    </Fab>
                </DialogActions>
            </Dialog>
            <Dialog sx={{ textAlign: "left" }} open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
                <DialogContent sx={{ textAlign: "left", overflowX: "auto" }}>
                    {selectedSinistre ? (
                        <SinistreDetails sinistre={selectedSinistre} />
                    ) : (
                        <Typography>Aucun sinistre  sélectionné.</Typography>
                    )}                </DialogContent>
                <DialogActions>


                    <Fab
                        color="primary"
                        variant="extended"
                        sx={{
                            mr: 1,
                            mb: {
                                xs: 1,
                                sm: 0,
                                lg: 0,
                            },
                        }}
                    >
                        <HighlightOffOutlinedIcon />
                        <Typography
                            sx={{
                                ml: 1,
                                textTransform: "capitalize",
                            }}
                            onClick={handleCloseDetailsDialog}
                        >
                            Fermer
                        </Typography>
                    </Fab>
                </DialogActions>
            </Dialog>
            {/* <Dialog sx={{ textAlign: "left" }} open={showAddClient} onClose={handleCloseAddClient}>
        <DialogContent sx={{ textAlign: "left", overflowX: "auto" }}>
            <AddClient
                // Pass any required props to the AddClient component, if needed
                refreshClientList={refreshClientList}
                handleCloseAddClient={handleCloseAddClient}
            />
        </DialogContent>
        <DialogActions>
            
        </DialogActions>
    </Dialog> */}
            <Dialog
                open={openCard}
                onClose={() => setOpenCard(false)}
                maxWidth="md" // Set the maximum width of the dialog
                fullWidth // Make the dialog take up the full width of the screen
            >
                <DialogTitle>Images</DialogTitle>
                <DialogContent sx={{ width: 'auto', textAlign: "center" }}>
                    {selectedSinistre && (
                        <Box

                        >
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: '#ed3026' }}> Copie du constat</Typography>

                            {selectedSinistre.constat.map((photo, index) => (
                                <Box key={index} my={1}>
                                    <a href={photo.url} target="_blank" rel="noopener noreferrer" style={{ color: '#204393', textDecoration: 'underline' }}>
                                        {photo.url}
                                    </a>
                                </Box>
                            ))}
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: '#ed3026' }}> Photos du sinistre</Typography>

                            {selectedSinistre.photos.map((photo, index) => (
                                <Box key={index} my={1}>
                                    <a href={photo.url} target="_blank" rel="noopener noreferrer" style={{ color: '#204393', textDecoration: 'underline' }}>
                                        {photo.url}
                                    </a>
                                </Box>
                            ))}
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
                    onClick={handleNextPage} disabled={sinistres.length < itemsPerPage}
                >
                    <ArrowForwardIosIcon />
                </Fab>




                <Button>Next</Button>
            </Box>



        </Box><Box>
                {/*  <Grid container spacing={0}>

                    <Grid item xs={12} lg={12}>    <SinistresChart /> </Grid>

                    <Grid item xs={12} lg={12}>  <SinistresByTypeChart /> </Grid>

                </Grid> */}




            </Box></>
    );
}


export default SinistresList