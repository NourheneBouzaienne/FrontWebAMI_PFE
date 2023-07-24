/* eslint-disable */

import React from "react";

import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    RadioGroup,
    Radio,
    FormControl,
    MenuItem,
    Switch,
} from "@mui/material";
import axios from "axios";

const numbers = [
    {
        value: "Cin",
        label: "Cin",
    },
    {
        value: "Passeport",
        label: "Passeport",
    },
    {
        value: "CarteSej",
        label: "Carte Séjour",
    },
    {
        value: "Matfisc",
        label: "Matricule fiscale",
    },
    {
        value: "RegistComm",
        label: "Registre du commerce",
    },

];

function updateClient({ selectedClient, setSelectedClient, refreshClientList, handleCloseUpdateDialog }) {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    });

    const handleSwitchChange = (event) => {
        setSelectedClient({ ...selectedClient, enabled: event.target.checked });
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const [value, setValue] = React.useState("");


    const handleChange2 = (event) => {
        //setValue(event.target.value);
        setSelectedClient({ ...selectedClient, typePers: event.target.value });


    };

    const [number, setNumber] = React.useState("");

    const handleChange3 = (event) => {
        //setNumber(event.target.value);
        setSelectedClient({ ...selectedClient, typeIDNT: event.target.value });
    };

    const handleSubmit = async () => {
        // Gather form data from the state variables
        // For example, you can create an object with the form data
        const formData = {
            name: selectedClient.name,
            email: selectedClient.email,
            typePers: selectedClient.typePers,
            typeIDNT: selectedClient.typeIDNT,
            username: selectedClient.username,
            numTel: selectedClient.numTel,
            adresse: selectedClient.adresse,
            enabled: selectedClient.enabled,
            password: selectedClient.password,
            activationCode: selectedClient.activationCode,
            isAuthentificated: selectedClient.isAuthentificated,
            roles: selectedClient.roles

        };
        console.log(selectedClient.roles)
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        try {

            const response = await axios.put(
                `http://localhost:8060/api/Gestionnaire/updateClient/${selectedClient.id}`,
                formData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Client updated:', response.data);
            refreshClientList();

            // Close the update form dialog
            handleCloseUpdateDialog();
        } catch (error) {
            console.error('Error updating client:', error);
            // Optionally, you can display an error message or perform other actions if the update fails
        }
    };


    return (
        <div>
            {/* ------------------------------------------------------------------------------------------------ */}
            {/* Basic Checkbox */}
            {/* ------------------------------------------------------------------------------------------------ */}
            <Card
                variant="outlined"
                sx={{
                    p: 0,
                }}
            >
                <Box
                    sx={{
                        padding: "15px 30px",
                    }}
                    display="flex"
                    alignItems="center"
                >
                    <Box flexGrow={1}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "500",
                            }}
                        >
                            Modifier Client
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent
                    sx={{
                        padding: "30px",
                    }}
                >
                    <form>
                        <Grid item lg={4} md={6} sm={12}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="Type Personne"
                                    name="Type Personne"
                                    value={selectedClient.typePers}
                                    onChange={handleChange2}
                                    row sx={{ marginBottom: 2 }}
                                >
                                    <FormControlLabel
                                        value="Morale"
                                        control={<Radio />}
                                        label="Morale"
                                    />
                                    <FormControlLabel
                                        value="Physique"
                                        control={<Radio />}
                                        label="Physique"
                                    />

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={selectedClient.name}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            id="typeIDNT"
                            variant="outlined"
                            select
                            label="Type Identifiant"
                            value={selectedClient.typeIDNT}
                            onChange={handleChange3}
                            sx={{ mb: 2 }}
                        >
                            {numbers.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="username"
                            label="Idantifiant"
                            variant="outlined"
                            value={selectedClient.username}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) => setSelectedClient({ ...selectedClient, username: e.target.value })}
                        />

                        <TextField
                            id="email-text"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={selectedClient.email} // Replace "email" with the appropriate property name for the email field
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                        />
                        <TextField
                            id="numTel"
                            label="Numéro Téléphone"
                            type="number"
                            variant="outlined"
                            value={selectedClient.numTel}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) => setSelectedClient({ ...selectedClient, numTel: e.target.value })}
                        />

                        <TextField
                            id="adresse"
                            label="Adresse"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            value={selectedClient.adresse}
                            onChange={(e) => setSelectedClient({ ...selectedClient, adresse: e.target.value })}

                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={selectedClient.enabled}
                                    onChange={handleSwitchChange}
                                    color="primary"

                                />
                            }
                            label="Status"
                        />


                        <Box display="flex" justifyContent="flex-end">
                            <Button color="primary" variant="contained" onClick={handleSubmit}>
                                Update Client
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    );

}

export default updateClient