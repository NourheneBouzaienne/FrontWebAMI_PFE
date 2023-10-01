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
        value: "gestionnaire",
        label: "Gestionnaire",
    },
    {
        value: "admin",
        label: "Administrateur",
    },

];

function AddGestionnaire({ refreshGestionnairesList, handleCloseAddClient }) {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    });

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [selectedGestionnaire, setSelectedGestionnaire] = React.useState({
        name: "",
        username: "",
        email: "",
        numTel: "",
        enabled: true,
        password: "",
        activationCode: "",
        roles: [],
    });

    const [passwordError, setPasswordError] = React.useState("");

    /*  const handleChangePassword = (event) => {
         setSelectedClient({ ...selectedClient, password: event.target.value });
     };
 
     const handleChangeConfirmPassword = (event) => {
         setSelectedClient({
             ...selectedClient,
             confirmPassword: event.target.value,
         });
     }; */
    const handleChange2 = (event) => {
        setSelectedGestionnaire({ ...selectedGestionnaire, typePers: event.target.value });
    };

    const handleChange3 = (event) => {
        setSelectedGestionnaire({ ...selectedGestionnaire, roles: event.target.value });
    };
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    const handleSubmit = async () => {
        const formData = { ...selectedGestionnaire };
        /*  if (formData.password !== formData.confirmPassword) {
             setPasswordError("Erreur: Les mots de passe ne correspondent pas.");
             return;
         }
  */
        //setPasswordError("");
        try {
            const response = await axios.post(
                "http://localhost:8060/api/Admin/addGestionnaire",
                formData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Gestionnaire added:', response.data);
            refreshGestionnairesList();
            handleCloseAddClient();


        } catch (error) {
            console.error("Error adding client:", error);

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
                            Ajouter un gestionnaire
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form>

                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={selectedGestionnaire.name}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) =>
                                setSelectedGestionnaire({ ...selectedGestionnaire, name: e.target.value })
                            }
                        />
                        <TextField
                            fullWidth
                            id="Role"
                            variant="outlined"
                            select
                            label="Role"
                            value={selectedGestionnaire.roles}
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
                            value={selectedGestionnaire.username}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) =>
                                setSelectedGestionnaire({ ...selectedGestionnaire, username: e.target.value })
                            }
                        />
                        <TextField
                            id="email-text"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={selectedGestionnaire.email}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) =>
                                setSelectedGestionnaire({ ...selectedGestionnaire, email: e.target.value })
                            }
                        />
                        {/*  <TextField
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
 */}

                        <TextField
                            id="numTel"
                            label="Numéro Téléphone"
                            type="number"
                            variant="outlined"
                            value={selectedGestionnaire.numTel}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) =>
                                setSelectedGestionnaire({ ...selectedGestionnaire, numTel: e.target.value })
                            }
                        />
                        {/*   <TextField
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
                        /> */}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={selectedGestionnaire.enabled}
                                    onChange={handleSwitchChange}
                                    color="primary"
                                />
                            }
                            label="Status"
                        />
                        <Box display="flex" justifyContent="flex-end">
                            <Button color="primary" variant="contained" onClick={handleSubmit}>
                                Ajouter
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddGestionnaire;
