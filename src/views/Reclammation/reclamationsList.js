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
    Fab
} from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import axios from "axios";
import { DailyActivities } from "../dashboards/dashboard1-components";
import ReclamationDetails from "./ReclamationDetails";

function ReclamationsList() {
    const [reclamations, setReclamations] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [selectedReclamationId, setSelectedReclamationId] = useState("");
    const [selectedReclamation, setSelectedReclamation] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    useEffect(() => {
        fetchReclamations();
    }, [page]);
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };


    const handleViewDetails = (reclamationId) => {
        fetchReclamationDetails(reclamationId);
        handleOpenDetailsDialog();
    };

    const fetchReclamations = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        try {
            const response = await axios.get(
                "http://localhost:8060/api/auth/reclammation/reclammations", {
                headers: {
                    Authorization: token,
                },
            });


            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            const slicedReclamations = response.data.slice(startIndex, endIndex);


            setReclamations(slicedReclamations);
        } catch (error) {
            console.error("Error fetching reclamations:", error);
        }
    };

    const handleOpenDialog = (reclamationId) => {
        setSelectedReclamationId(reclamationId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDetailsDialog = () => {
        setOpenDetailsDialog(true);
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
    };


    const updateEtatReclamation = async (reclamationId, newState) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:8060/api/auth/reclammation/${reclamationId}`,
                { etat: newState },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            fetchReclamations(); // Mettre à jour les réclamations après la modification
        } catch (error) {
            throw new Error("Error updating reclamation state");
        }
    };

    const handleStateChange = async () => {
        try {
            await updateEtatReclamation(selectedReclamationId, selectedState);
            handleCloseDialog();
        } catch (error) {
            console.error("Error updating reclamation state:", error);
        }
    };

    const fetchReclamationDetails = async (reclamationId) => {
        try {
            const response = await axios.get(
                `http://localhost:8060/api/auth/reclammation/${reclamationId}`
            );

            setSelectedReclamation(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la réclamation :', error);
        }
    };


    const handleShowDetails = (reclamationId) => {
        fetchReclamationDetails(reclamationId);
        handleOpenDetailsDialog();
    };


    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3">Liste des réclamations</Typography>
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
                                            Catégorie
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Objet
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Date
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Etat
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography color="textSecondary" variant="h6">
                                            Client
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
                                {reclamations.map((reclamation) => (
                                    <TableRow key={reclamation.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {reclamation.id}
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
                                                        {reclamation.categ}
                                                    </Typography>
                                                    <Typography
                                                        color="textSecondary"
                                                        sx={{
                                                            fontSize: "13px",
                                                        }}
                                                    >
                                                        {reclamation.post}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {reclamation.object}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {reclamation.dateCreation}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                sx={{
                                                    pl: "4px",
                                                    pr: "4px",
                                                    backgroundColor: (() => {
                                                        if (reclamation.etat === "Non traitée") {
                                                            return "#ed3026";
                                                        } else if (reclamation.etat === "Traitée") {
                                                            return "primary.main";
                                                        } else {
                                                            return "primary.main";
                                                        }
                                                    })(),
                                                    color: "#fff",
                                                }}
                                                size="small"
                                                label={reclamation.etat}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="h6">
                                                {reclamation.user.username}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleOpenDialog(reclamation.id)} // Passer l'ID de la réclamation
                                            >
                                                Changer l'état
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
                                                onClick={() => handleViewDetails(reclamation.id)}
                                            >
                                                <InfoIcon />
                                            </Fab>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Changer l'état</DialogTitle>
                <DialogContent>
                    <Select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                        <MenuItem value="Non traitée">Non traitée</MenuItem>
                        <MenuItem value="En cours de traitement">En cours de traitement</MenuItem>
                        <MenuItem value="Traitée">Traitée</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button onClick={handleStateChange}>Confirmer</Button>
                </DialogActions>
            </Dialog>
            <Dialog sx={{ textAlign: "left" }} open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
                <DialogContent sx={{ textAlign: "left", overflowX: "auto" }}>
                    {selectedReclamation ? (
                        <ReclamationDetails reclamation={selectedReclamation}
                            handleCloseDetailDialog={handleCloseDetailsDialog}
                        />
                    ) : (
                        <Typography>Aucune réclamation sélectionnée.</Typography>
                    )}                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailsDialog}>Fermer</Button>
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
                    onClick={handleNextPage} disabled={reclamations.length < itemsPerPage}
                >
                    <ArrowForwardIosIcon />
                </Fab>




                <Button>Next</Button>
            </Box>

        </Box>
    );
}

export default ReclamationsList;
