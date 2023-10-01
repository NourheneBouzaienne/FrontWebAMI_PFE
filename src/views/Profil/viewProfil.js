/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Menu,
    MenuItem,
    IconButton,
    TextField,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import axios from "axios";


import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import Alert from '@mui/material/Alert';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';

import SyncLockOutlinedIcon from '@mui/icons-material/SyncLockOutlined';



function ViewProfil() {

    const [anchorEl, setAnchorEl] = useState(null);

    const [gestionnaire, setGestionnaire] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const [updatedProfile, setUpdatedProfile] = useState({});
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const handleOpenUpdateDialog = () => {
        setOpenUpdateDialog(true);
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    const handleOpenPasswordDialog = () => {
        setOpenPasswordDialog(true);
        setAnchorEl4(null);
    };

    const handleClosePasswordDialog = () => {
        setOpenPasswordDialog(false);
    };


    const fetchConnectedUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }

        try {
            const response = await axios.get(
                "http://localhost:8060/api/Gestionnaire/profile",
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const connectedUserProfile = response.data;
            setGestionnaire(connectedUserProfile);
            setUpdatedProfile({
                name: connectedUserProfile.name,
                email: connectedUserProfile.email,
                username: connectedUserProfile.username,
                numTel: connectedUserProfile.numTel,
                // Add other properties if needed
            });
        } catch (error) {
            console.error("Error fetching connected user profile:", error);
        }
    };
    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false);
        handleCloseUpdateDialog(); // Close the dialog when the form is closed
    };

    useEffect(() => {
        fetchConnectedUserProfile();
    }, []);

    const updateProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }

        try {
            const response = await axios.put(
                "http://localhost:8060/api/Gestionnaire/updateMyProfile",
                updatedProfile,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            console.log("Profil mis à jour :", response.data);
            setGestionnaire(response.data);
            handleCloseUpdateDialog();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil :", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedProfile({
            ...updatedProfile,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateProfile();
    };

    const timelineData = [
        { key: "Nom", value: gestionnaire?.name || "", icon: PersonOutlinedIcon },
        { key: "Numéro Tel", value: gestionnaire?.numTel || "", icon: LocalPhoneOutlinedIcon },
        { key: "Identifiant", value: gestionnaire?.username || "", icon: ConfirmationNumberOutlinedIcon },
        { key: "Email", value: gestionnaire?.email || "", icon: AlternateEmailOutlinedIcon },
    ];

    const options = ["Modifier"];

    const [reponse, setReponse] = useState("");
    const [showTextarea, setShowTextarea] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [emailContent, setEmailContent] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        const selectedOption = event.target.textContent;
        console.log(selectedOption);
        if (selectedOption === "Modifier") {
            setShowTextarea(true);
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionSelect = (option) => {
        if (option === "Modifier") {
            setShowTextarea(true);
            setShowUpdateForm(true);
            handleOpenUpdateDialog();
        } else {
            setShowTextarea(false);
        }
    };

    const [anchorEl4, setAnchorEl4] = useState(null);

    const handleClick4 = (event) => {
        setAnchorEl4(event.currentTarget);
    };

    const handleClose4 = () => {
        setAnchorEl4(null);
    };


    const handlePasswordChangeSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }

        // Perform validation on the form fields here
        if (newPassword !== confirmNewPassword) {
            console.log("Passwords do not match");
            setError("Les mots de passe ne correspondent pas.");

            return;
        }



        const passwordData = {
            currentPassword: currentPassword,
            newPassword: newPassword,
        };


        axios
            .put("http://localhost:8060/api/Gestionnaire/changePassword", null, {
                params: passwordData,
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setSuccessMessage("Le mot de passe a été changé avec succès !");
                handleClosePasswordDialog();
            })
            .catch((error) => {
                console.error("Error changing password:", error);
                setError("Une erreur s'est produite lors du changement du mot de passe.");
            });
    };



    return (
        <Card variant="outlined" sx={{ width: "800px", marginLeft: 20, marginTop: 10 }}>
            <CardContent>
                <Box className="timelineContainer" sx={{ display: "flex", mb: 5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" sx={{ fontWeight: "500" }} gutterBottom>
                            Mon Profil
                        </Typography>

                    </Box>
                    <Box sx={{ marginLeft: "auto" }}>
                        <IconButton
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <EditNoteOutlinedIcon sx={{ color: '#204393' }} />
                        </IconButton>

                        <IconButton
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleOpenPasswordDialog}
                        >
                            <SyncLockOutlinedIcon sx={{ color: '#204393' }} />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            {options.map((option) => (
                                <MenuItem
                                    key={option}
                                    selected={option === "Modifier"}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>

                <Timeline sx={{ p: 0 }}>
                    {timelineData.map(({ key, value, icon: Icon }) => (
                        <TimelineItem key={key} sx={{ display: "flex", alignItems: "center" }}>
                            <TimelineOppositeContent
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#ed3026",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                <Icon sx={{ fontSize: "24px", marginRight: 1 }} />
                                <Typography sx={{ fontWeight: "bold" }}>{key}</Typography>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineConnector />
                            </TimelineSeparator>

                            <TimelineContent
                                color="text.secondary"
                                sx={{
                                    textAlign: "left",
                                    alignItems: "flex-start",
                                    fontSize: "16px",
                                    maxWidth: "250px",
                                }}
                            >
                                <Typography>{value}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
                {/* <Button variant="contained" color="primary" onClick={handleOpenPasswordDialog}>
                    Changer le mot de passe
                </Button> */}

                <div>
                    {showUpdateForm && (
                        <Dialog open={openUpdateDialog} onClose={handleCloseUpdateForm}>
                            <DialogTitle sx={{ backgroundColor: "#f5f5f5", color: "red", fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: "40" }}>
                                <Typography variant="h6">  Modifier mon profil</Typography>
                            </DialogTitle>
                            <DialogContent sx={{ p: 0 }}>
                                <Card variant="outlined" sx={{ padding: "30px", mt: 2 }}>
                                    <form>
                                        <TextField
                                            id="username"
                                            label="Identifiant"
                                            variant="outlined"
                                            value={updatedProfile.username || ""}
                                            fullWidth
                                            sx={{
                                                mb: 2,
                                            }}
                                            onChange={handleChange}
                                            name="username"
                                        />
                                        <TextField
                                            id="name"
                                            label="Name"
                                            variant="outlined"
                                            value={updatedProfile.name || ""}
                                            fullWidth
                                            sx={{
                                                mb: 2,
                                            }}
                                            onChange={handleChange}
                                            name="name"
                                        />
                                        <TextField
                                            id="email-text"
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            value={updatedProfile.email || ""}
                                            fullWidth
                                            sx={{
                                                mb: 2,
                                            }}
                                            onChange={handleChange}
                                            name="email"
                                        />
                                        <TextField
                                            id="numTel"
                                            label="Numéro Téléphone"
                                            type="number"
                                            variant="outlined"
                                            value={updatedProfile.numTel || ""}
                                            fullWidth
                                            sx={{
                                                mb: 2,
                                            }}
                                            onChange={handleChange}
                                            name="numTel"
                                        />
                                        <Box display="flex" justifyContent="flex-end">
                                            <Button color="primary" variant="contained" onClick={handleSubmit}>
                                                Modifier mon profil
                                            </Button>
                                            <Button onClick={handleCloseUpdateForm}>Annuler</Button>
                                        </Box>
                                    </form>
                                </Card>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
                    <DialogTitle sx={{ backgroundColor: "#f5f5f5", color: "red", fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: "40" }}>
                        <Typography variant="h6"> Changer le mot de passe</Typography>
                    </DialogTitle>
                    <DialogContent >
                        <form >
                            <TextField
                                label="Ancien mot de passe"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                sx={{ margin: 1 }}
                            />
                            <TextField
                                label="Nouveau mot de passe"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                sx={{ margin: 1 }}
                            />
                            <TextField
                                label="Confirmer le nouveau mot de passe"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                sx={{ margin: 1 }}
                            />

                            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                        </form>

                        {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePasswordDialog}>Annuler</Button>
                        <Button onClick={handlePasswordChangeSubmit} color="primary">
                            Sauvegarder
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}

export default ViewProfil;
