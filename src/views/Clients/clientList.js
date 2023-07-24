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
    Fab
} from "@mui/material";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InfoIcon from '@mui/icons-material/Info';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';


import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import { DailyActivities } from "../dashboards/dashboard1-components";
import ClientDetails from "./clientDetails";
import UpdateClient from './updateClient'
import AddClient from "./addClient";


function clientList() {
    const [clients, setClients] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedState, setSelectedState] = useState("");
    const [selectedClientId, setSelectedClientId] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddClient, setShowAddClient] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);
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
    const handleDeleteClient = async (clientId) => {

        try {
            // Make an API call to delete the client
            await axios.delete(`http://localhost:8060/api/Gestionnaire/deleteClient/${clientId}`, {
                headers: {
                    Authorization: token,
                },
            });

            console.log(`Client with ID ${clientId} deleted successfully.`);
            // Call the function to refresh the client list after successful deletion
            refreshClientList();
        } catch (error) {
            console.error(`Error deleting client with ID ${clientId}:`, error);
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

    const refreshClientList = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8060/api/Gestionnaire/clients",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setClients(response.data);
        } catch (error) {
            console.error("Error fetching CLIENTS:", error);
        }
    };
    const fetchClients = async () => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            return null;
        }
        try {
            const response = await axios.get(
                "http://localhost:8060/api/Gestionnaire/clients", {
                headers: {
                    Authorization: token,
                },
            });

            setClients(response.data);
        } catch (error) {
            console.error("Error fetching CLIENTS:", error);
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
                                {clients.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {client.id}
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
                                                        {client.name}
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
                                                        {client.username}
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
                                                        {client.email}
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
                                        </TableCell>

                                        <TableCell align="right">
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleOpenUpdateForm(client.id)}

                                            >
                                                Modifier
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
                                                onClick={() => handleViewDetails(client.id)}
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
                                                onClick={() => handleDeleteClient(client.id)}
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
                            handleCloseUpdateDialog={handleCloseUpdateDialog}
                        />
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
                    {selectedClient ? (
                        <ClientDetails client={selectedClient} />
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
                            onClick={handleCloseDetailsDialog}
                        >
                            Fermer
                        </Typography>
                    </Fab>
                </DialogActions>
            </Dialog>
            <Dialog sx={{ textAlign: "left" }} open={showAddClient} onClose={handleCloseAddClient}>
                <DialogContent sx={{ textAlign: "left", overflowX: "auto" }}>
                    <AddClient
                        // Pass any required props to the AddClient component, if needed
                        refreshClientList={refreshClientList}
                        handleCloseAddClient={handleCloseAddClient}
                    />
                </DialogContent>
                <DialogActions>
                    {/* Optionally, add buttons or actions for the AddClient dialog */}
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default clientList