/* eslint-disable */

import React, { useState } from "react";

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
        value: 3,
        label: "ROLE_GESTIONNAIRE",
    },
    {
        value: 2,
        label: "ROLE_ADMIN",
    },
    // Ajoutez d'autres rôles ici si nécessaire
];


function updateProfil({ selectedGestionnaire, setSelectedGestionnaire,
    refreshClientList, handleCloseUpdateDialog }) {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    });

    const handleSwitchChange = (event) => {
        setSelectedGestionnaire({ ...selectedGestionnaire, enabled: event.target.checked });
    };

    const [selectedRole, setSelectedRole] = useState(
        selectedGestionnaire.roles && selectedGestionnaire.roles.length > 0
            ? selectedGestionnaire.roles[0].id
            : ""
    );


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const [value, setValue] = React.useState("");


    const handleChange2 = (event) => {
        //setValue(event.target.value);
        setSelectedGestionnaire({ ...selectedGestionnaire, typePers: event.target.value });


    };

    const [number, setNumber] = React.useState("");

    const handleChange3 = (event) => {
        const selectedRoleId = parseInt(event.target.value);
        const selectedRole = numbers.find((role) => role.value === selectedRoleId);
        setSelectedRole(selectedRoleId);
        setSelectedGestionnaire({
            ...selectedGestionnaire,
            roles: selectedRole ? [selectedRole] : [],
        });
    };

    //console.log(selectedRole)


    const handleSubmit = async () => {
        // Gather form data from the state variables
        // For example, you can create an object with the form data
        const rolesArray = [selectedGestionnaire.roles];

        const formData = {
            name: selectedGestionnaire.name,
            email: selectedGestionnaire.email,
            username: selectedGestionnaire.username,
            numTel: selectedGestionnaire.numTel,
            enabled: selectedGestionnaire.enabled,
            password: selectedGestionnaire.password,
            activationCode: selectedGestionnaire.activationCode,
            roles: rolesArray,
        };

        console.log(formData)
        const token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        try {

            const response = await axios.put(
                `http://localhost:8060/api/Admin/updateGest/${selectedGestionnaire.id}`,
                formData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Gestionnaire updated:', response.data);
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

                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={selectedGestionnaire.name}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) => setSelectedGestionnaire({ ...selectedGestionnaire, name: e.target.value })}
                        />


                        {/*    <TextField
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
 */}                      {/*  <TextField
                            fullWidth
                            id="Role"
                            variant="outlined"
                            select
                            label="Role"
                            value={selectedRole}
                            onChange={handleChange3}
                            sx={{ mb: 2 }}
                        >
                            {numbers.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField> */}


                        <TextField
                            id="username"
                            label="Idantifiant"
                            variant="outlined"
                            value={selectedGestionnaire.username}
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) => setSelectedGestionnaire({ ...selectedGestionnaire, username: e.target.value })}
                        />

                        <TextField
                            id="email-text"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={selectedGestionnaire.email} // Replace "email" with the appropriate property name for the email field
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            onChange={(e) => setSelectedGestionnaire({ ...selectedGestionnaire, email: e.target.value })}
                        />
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
                            onChange={(e) => setSelectedGestionnaire({ ...selectedGestionnaire, numTel: e.target.value })}
                        />


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
                                Modifier
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    );

}

export default updateProfil