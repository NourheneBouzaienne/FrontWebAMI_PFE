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
function SinistreDetails({ sinistre }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const timelineData = [
        //{ key: "Id", value: sinistre.id, icon: ConfirmationNumberIcon },
        { key: "Client", value: sinistre.user.username, icon: PersonOutlinedIcon },
        { key: "Date", value: sinistre.date, icon: DateRangeOutlinedIcon },
        { key: "Numéro Cnt", value: sinistre.numCnt, icon: DescriptionOutlinedIcon },
        { key: "Lieu", value: `Longitude: ${sinistre.longitude}, Latitude: ${sinistre.latitude}`, icon: LocationOnOutlinedIcon },
        { key: "Description", value: sinistre.description, icon: DescriptionOutlinedIcon },
        { key: "Réf", value: sinistre.referenceCode, icon: ConfirmationNumberOutlinedIcon },
    ];

    const options = ["Répondre"];

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
        if (selectedOption === "Répondre") {
            setShowTextarea(true);
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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


    const handleRepondre = () => {
        axios.post(
            `http://localhost:8060/api/Gestionnaire/sinistre/${sinistre.id}/repondre`,
            reponse, // Envoyer directement la chaîne de caractères sans objet JSON
            {
                headers: {
                    'Content-Type': 'text/plain', // Définir le type de contenu comme "text/plain"
                    Authorization: token
                }
            }
        )
            .then(() => {
                console.log(reponse);
                setShowAlert(true); // Afficher l'alerte

            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <Card variant="outlined" sx={{ width: "auto" }}>
            <CardContent>
                <Box className="timelineContainer" sx={{ display: "flex", mb: 5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" sx={{ fontWeight: "500" }} gutterBottom>
                            Détails du sinistre
                        </Typography>
                        {/* Add any additional actions or icons here */}
                    </Box>
                    <Box sx={{ marginLeft: "auto" }}>
                        <IconButton
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <ReplyAllOutlinedIcon sx={{ color: '#204393' }} />
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
                                    maxWidth: "250px", // Limit the width to prevent overflow
                                }}
                            >
                                <Typography>{value}</Typography>
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
                {showAlert && (
                    <Alert severity="success" onClose={() => setShowAlert(false)}>
                        Notification envoyée au client !
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

export default SinistreDetails; 