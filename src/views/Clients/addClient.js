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

function addClient({ refreshClientList, handleCloseAddClient }) {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    });

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [selectedClient, setSelectedClient] = React.useState({
        typePers: "",
        name: "",
        typeIDNT: "",
        username: "",
        email: "",
        numTel: "",
        adresse: "",
        enabled: true,
        password: "",
        activationCode: "",
        isAuthentificated: false,
        roles: [],
    });

    const [passwordError, setPasswordError] = React.useState("");

    const handleChangePassword = (event) => {
        setSelectedClient({ ...selectedClient, password: event.target.value });
    };

    const handleChangeConfirmPassword = (event) => {
        setSelectedClient({
            ...selectedClient,
            confirmPassword: event.target.value,
        });
    };
    const handleChange2 = (event) => {
        setSelectedClient({ ...selectedClient, typePers: event.target.value });
    };

    const handleChange3 = (event) => {
        setSelectedClient({ ...selectedClient, typeIDNT: event.target.value });
    };
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    const handleSubmit = async () => {
        // Gather form data from the state variables
        const formData = { ...selectedClient };
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Erreur: Les mots de passe ne correspondent pas.");
            return;
        }

        // Clear the error message if passwords match
        setPasswordError("");
        try {
            const response = await axios.post(
                "http://localhost:8060/api/Gestionnaire/addClient",
                formData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Client added:', response.data);
            refreshClientList();
            handleCloseAddClient();
            // Optionally, you can perform additional actions after client creation
            // For example, show a success message or refresh the client list

        } catch (error) {
            console.error("Error adding client:", error);
            // Optionally, you can display an error message or perform other actions if adding the client fails
        }
    };

    return (
        <div>
            {/* ------------------------------------------------------------------------------------------------ */}
            {/* Basic Checkbox */}
            {/* ------------------------------------------------------------------------------------------------ */}
            <Card variant="outlined" sx={{ p: 0 }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                            Ajouter un client
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form>
                        <Grid item lg={4} md={6} sm={12}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="Type Personne"
                                    name="Type Personne"
                                    value={selectedClient.typePers}
                                    onChange={handleChange2}
                                    row
                                    sx={{ marginBottom: 2 }}
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
                            onChange={(e) =>
                                setSelectedClient({ ...selectedClient, name: e.target.value })
                            }
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
                            onChange={(e) =>
                                setSelectedClient({ ...selectedClient, username: e.target.value })
                            }
                        />
                        <TextField
                            id="email-text"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={selectedClient.email}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) =>
                                setSelectedClient({ ...selectedClient, email: e.target.value })
                            }
                        />
                        <TextField
                            id="password"
                            label="Mot de passe"
                            type="password"
                            variant="outlined"
                            value={selectedClient.password}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={handleChangePassword}
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirmer mot de passe"
                            type="password"
                            variant="outlined"
                            value={selectedClient.confirmPassword}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={handleChangeConfirmPassword}
                        />
                        {passwordError && (
                            <Typography color="secondary" sx={{ mb: 2 }}>
                                {passwordError}
                            </Typography>
                        )}


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
                            onChange={(e) =>
                                setSelectedClient({ ...selectedClient, numTel: e.target.value })
                            }
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
                            onChange={(e) =>
                                setSelectedClient({ ...selectedClient, adresse: e.target.value })
                            }
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
                                Add Client
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default addClient;
