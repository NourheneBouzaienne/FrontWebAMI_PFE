import React, { useState } from "react";
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
import Alert from '@mui/material/Alert';

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import axios from "axios";


const ReclamationDetails = ({ reclamation }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [reponse, setReponse] = useState("");
    const [showTextarea, setShowTextarea] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [emailContent, setEmailContent] = useState("");
    const [showAlert, setShowAlert] = useState(false);


    const flattenedReclamation = [
        { key: "Id", value: reclamation.id },
        { key: "Catégorie", value: reclamation.categ },
        { key: "Date", value: reclamation.dateCreation },
        { key: "Etat", value: reclamation.etat },
        { key: "Description", value: reclamation.description },
        { key: "Client", value: reclamation.user.email },
    ];

    const options = ["Répondre", "Envoyer un Mail"];
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    const handleRepondre = () => {

        axios.post(`http://localhost:8060/api/auth/reclammation/${reclamation.id}/repondre`, reponse, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then(() => {
                console.log(reponse);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleOptionSelect = (option) => {
        if (option === "Répondre") {
            setShowTextarea(true);
        } else {
            setShowTextarea(false);
        }

        if (option === "Envoyer un Mail") {
            handleOpenDialog();
        }

        handleClose();
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const sendEmail = () => {
        const emailRequest = {
            email: reclamation.user.email, // Adresse e-mail du destinataire récupérée de la réclamation
            subject: reclamation.object, // Objet de la réclamation
            content: emailContent, // Contenu du courrier électronique récupéré à partir du champ de texte
        };


        axios.post("http://localhost:8060/api/auth/reclammation/sendEmail", emailRequest, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        })
            .then((response) => {
                console.log("E-mail envoyé avec succès !");
                setShowAlert(true); // Afficher l'alerte

            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi de l'e-mail :", error);
            });
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        const selectedOption = event.target.textContent;
        console.log(selectedOption);
        if (selectedOption === "Répondre") {
            setShowTextarea(true);
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <Card variant="outlined" sx={{ width: 400 }}>
            <CardContent>
                <Box className="timelineContainer" sx={{ display: "flex", mb: 5 }}>
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: "500",
                                fontSize: "h3.fontSize",
                                marginBottom: "0",
                            }}
                            gutterBottom
                        >
                            Détails réclamation
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                            sx={{
                                fontWeight: "400",
                                fontSize: "13px",
                            }}
                        ></Typography>
                    </Box>
                    <Box sx={{ marginLeft: "auto" }}>
                        <IconButton
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertOutlinedIcon />
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
                                    selected={option === "Répondre"}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Box>
                <Timeline sx={{ p: 0, marginLeft: -28 }}>
                    {flattenedReclamation.map(({ key, value }) => (
                        <TimelineItem key={key}>
                            <TimelineOppositeContent
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                }}
                            >
                                {key}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot
                                    variant="outlined"
                                    sx={{
                                        borderColor: "red",
                                    }}
                                />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent
                                color="text.secondary"
                                sx={{
                                    fontSize: "14px",
                                    textAlign: "left",
                                    alignItems: "flex-start",
                                }}
                            >
                                {value}
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>

                <div>
                    {showTextarea && (
                        <TextField
                            id="outlined-multiline-static"
                            label="Réponse"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={reponse}
                            onChange={(e) => setReponse(e.target.value)}
                        />
                    )}

                    {showTextarea && (
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
                            onClick={handleRepondre}
                        >
                            <CheckCircleOutlineOutlinedIcon />
                            <Typography sx={{ ml: 1, textTransform: "capitalize" }}>Répondre</Typography>
                        </Fab>
                    )}
                </div>

                <Dialog open={openDialog} onClose={handleCloseDialog} maxHeight="md">
                    <DialogTitle>Envoyer un e-mail</DialogTitle>
                    <DialogContent sx={{ height: "100%" }}>
                        <TextField
                            label="Adresse e-mail"
                            fullWidth
                            value={reclamation.user.email}
                            disabled
                            sx={{ marginBottom: 2, marginTop: 2 }}
                        />
                        <TextField
                            label="Contenu du courrier électronique"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
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

            </CardContent>
        </Card>
    );
};

export default ReclamationDetails;