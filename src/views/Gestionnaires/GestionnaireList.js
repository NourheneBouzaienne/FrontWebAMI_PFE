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
    ButtonGroup
} from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InfoIcon from '@mui/icons-material/Info';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import { DailyActivities } from "../dashboards/dashboard1-components";
import AddGestionnaire from "./AddGestionnaire";
import UpdateGestionnaire from "./UpdateGestionnaire";



function GestionnaireList() {
    const [gestionnaires, setGestionnaires] = useState([]);
    const [roles, setRoles] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [selectedGestionnaireId, setSelectedGestionnaireId] = useState("");
    const [selectedGestionnaire, setSelectedGestionnaire] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddClient, setShowAddClient] = useState(false);
    const [selectedGestionnaireForRole, setSelectedGestionnaireForRole] = useState(null);
    const [openRoleDialog, setOpenRoleDialog] = useState(false);


    const [page, setPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    useEffect(() => {
        fetchGestionnaires();
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

    const handleOpenRoleDialog = (gestionnaire) => {
        setSelectedGestionnaireForRole(gestionnaire);
        setOpenRoleDialog(true);
    };

    const handleOpenUpdateForm = (gestionnaireId) => {
        setSelectedGestionnaireId(gestionnaireId);
        const selectedGestionnaire = gestionnaires.find((gestionnaire) => gestionnaire.id === gestionnaireId);

        // Check if selectedGestionnaire.roles is an array with at least one role, and take the first role
        const selectedRole = selectedGestionnaire.roles && selectedGestionnaire.roles.length > 0 ? selectedGestionnaire.roles[0] : null;

        setSelectedGestionnaire({ ...selectedGestionnaire, roles: selectedRole });
        setShowUpdateForm(true);
    };

    const handleCloseUpdateDialog = () => {
        setShowUpdateForm(false);
    };

    const handleViewDetails = (clientId) => {
        fetchClientDetails(clientId);
        handleOpenDetailsDialog();
    };

    const handleSubmit = () => {
        // Add the logic to gather form data and call the updateClient method
        // For example, you can create an object with the form data and call updateClient(selectedClientId, formData)
        // Replace "formData" with the actual data from the form
        // Don't forget to set setShowUpdateForm(false) to close the form after submission
    };
    const handleDeleteGestionnaire = async (gestionnaireId) => {

        try {
            // Make an API call to delete the client
            await axios.delete(`http://localhost:8060/api/Admin/deleteGestionnaire/${gestionnaireId}`, {
                headers: {
                    Authorization: token,
                },
            });

            console.log(`gestionnaireI with ID ${gestionnaireId} deleted successfully.`);
            // Call the function to refresh the client list after successful deletion
            refreshGestionnairesList();
        } catch (error) {
            console.error(`Error deleting gestionnaire with ID ${gestionnaireId}:`, error);
        }
    };

    const fetchClientDetails = async (clientId) => {
        try {
            const response = await axios.get(
                `http://localhost:8060/api/Gestionnaire/client/${clientId}`, {
                headers: {
                    Authorization: token,
                },
            });
            console.log(token)
            setSelectedClient(response.data);
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

    const refreshGestionnairesList = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8060/api/Admin/gestionnaires", {
                headers: {
                    Authorization: token,
                },
            });
            const rolesResponse = await axios.get(
                "http://localhost:8060/api/Roles/allRoles", {
                headers: {
                    Authorization: token,
                },
            });

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const slicedGestionnaires = response.data.slice(startIndex, endIndex);

            setGestionnaires(slicedGestionnaires);
            setRoles(rolesResponse.data); // Stockez la liste des rôles dans l'état des rôles

        } catch (error) {
            console.error("Error fetching Gestionnaires:", error);
        }
    };
    const fetchGestionnaires = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            return null;
        }
        try {
            const response = await axios.get(
                "http://localhost:8060/api/Admin/gestionnaires", {
                headers: {
                    Authorization: token,
                },
            });
            const rolesResponse = await axios.get(
                "http://localhost:8060/api/Roles/allRoles", {
                headers: {
                    Authorization: token,
                },
            });

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const slicedGestionnaires = response.data.slice(startIndex, endIndex);

            setGestionnaires(slicedGestionnaires);
            setRoles(rolesResponse.data); // Stockez la liste des rôles dans l'état des rôles

        } catch (error) {
            console.error("Error fetching Gestionnaires:", error);
        }
    };

    const handleRoleChange = (event) => {
        const selectedRoleName = event.target.value;
        // Trouver le rôle correspondant dans la liste des rôles disponibles
        const selectedRole = roles.find((role) => role.name === selectedRoleName);
        setSelectedGestionnaireForRole(prevState => ({
            ...prevState,
            roles: [selectedRole]
        }));
    };
    const handleUpdateRole = async () => {
        if (!selectedGestionnaireForRole || !selectedGestionnaireForRole.roles || selectedGestionnaireForRole.roles.length === 0) {
            console.error("Invalid selectedGestionnaireForRole or roles");
            return;
        }

        const selectedRoleName = selectedGestionnaireForRole.roles[0].name; // Récupérer le nom du rôle sélectionné
        const formData = selectedRoleName; // Envoyer uniquement le nom du rôle

        try {
            const response = await axios.put(
                `http://localhost:8060/api/Admin/updateRole/${selectedGestionnaireForRole.id}`,
                formData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json', // Utiliser 'text/plain' comme type de contenu pour envoyer uniquement une chaîne de caractères
                    },
                }
            );

            console.log('Rôle du gestionnaire mis à jour:', response.data);
            refreshGestionnairesList();
            handleCloseRoleDialog();
        } catch (error) {
            console.error('Erreur lors de la mise à jour du rôle du gestionnaire:', error);
        }
    };





    const handleCloseRoleDialog = () => {

        setOpenRoleDialog(false);
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
                    onClick={handleOpenAddClient}
                >
                    <AddToPhotosOutlinedIcon />
                </Fab>
            </Box>

            <Card variant="outlined">

                <CardContent>

                    <Typography variant="h3">Liste des clients </Typography>
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
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Identifiant
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            STATUS
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
                                {gestionnaires.map((gestionnaire) => (
                                    <TableRow key={gestionnaire.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {gestionnaire.id}
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
                                                        {gestionnaire.name}
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
                                                        {gestionnaire.username}
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
                                                        {gestionnaire.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>

                                        <TableCell>
                                            <Chip
                                                sx={{
                                                    pl: "4px",
                                                    pr: "4px",
                                                    backgroundColor: (() => {
                                                        if (gestionnaire.enabled == 0) {
                                                            return "#ed3026";
                                                        } else if (gestionnaire.enabled == 1) {
                                                            return "primary.main";
                                                        } else {
                                                            return "black";
                                                        }
                                                    })(),
                                                    color: "#fff",
                                                }}
                                                size="small"
                                                label={gestionnaire.enabled == 1 ? "Enabled" : "Disabled"}
                                            />
                                        </TableCell>

                                        <TableCell align="right">
                                            <Box
                                                sx={{
                                                    mb: 2,
                                                }}
                                            >
                                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                                    <Button

                                                        onClick={() => handleOpenUpdateForm(gestionnaire.id)}

                                                    >
                                                        Modifier
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => handleOpenRoleDialog(gestionnaire)}
                                                    >
                                                        Rôle
                                                    </Button>
                                                    <Button color='secondary' onClick={() => handleDeleteGestionnaire(gestionnaire.id)} > Supprimer </Button>
                                                </ButtonGroup>
                                            </Box>
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
                    <UpdateGestionnaire
                        selectedGestionnaire={selectedGestionnaire}
                        setSelectedGestionnaire={setSelectedGestionnaire}

                        refreshClientList={refreshGestionnairesList}
                        handleCloseUpdateDialog={handleCloseUpdateDialog}
                    />
                </DialogContent>
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
                        < HighlightOffOutlinedIcon />
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
                    {/*  {selectedClient ? (
                        <ClientDetails client={selectedClient} />
                    ) : (
                        <Typography>Aucun client  sélectionné.</Typography>
                    )}       */}          </DialogContent>
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
            <Dialog sx={{ textAlign: "left" }} open={showAddClient} onClose={handleCloseAddClient}>
                <DialogContent sx={{ textAlign: "left", overflowX: "auto" }}>
                    <AddGestionnaire
                        // Pass any required props to the AddClient component, if needed
                        refreshGestionnairesList={refreshGestionnairesList}
                        handleCloseAddClient={handleCloseAddClient}
                    />
                </DialogContent>
                <DialogActions>
                    {/* Optionally, add buttons or actions for the AddClient dialog */}
                </DialogActions>
            </Dialog>
            <Dialog
                open={openRoleDialog}
                onClose={handleCloseRoleDialog}
            >
                <DialogTitle>Modifier le rôle</DialogTitle>
                <DialogContent>
                    {/* Affichez ici le formulaire de modification du rôle */}
                    {selectedGestionnaireForRole && (
                        <>
                            <Typography variant="h6">Nom du gestionnaire: {selectedGestionnaireForRole.name}</Typography>
                            <Select
                                value={
                                    selectedGestionnaireForRole.roles && selectedGestionnaireForRole.roles.length > 0
                                        ? selectedGestionnaireForRole.roles[0].name
                                        : ""
                                }
                                onChange={handleRoleChange}
                            >
                                {/* Affichez ici la liste des rôles disponibles (récupérée depuis le backend) */}
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.name}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseRoleDialog}>Annuler</Button>
                    <Button onClick={handleUpdateRole}>Enregistrer</Button>
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
                    onClick={handleNextPage} disabled={gestionnaires.length < itemsPerPage}
                >
                    <ArrowForwardIosIcon />
                </Fab>




                <Button>Next</Button>
            </Box>
        </Box>
    );
}

export default GestionnaireList