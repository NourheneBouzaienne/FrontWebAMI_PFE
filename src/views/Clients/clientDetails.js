/* eslint-disable */

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

function clientDetails({ client }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [reponse, setReponse] = useState("");
    const [showTextarea, setShowTextarea] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [emailContent, setEmailContent] = useState("");
    const [showAlert, setShowAlert] = useState(false);


    const flattenedClient = [
        { key: "Id", value: client.id },
        { key: "Type client", value: client.typePers },
        { key: "Name", value: client.name },
        { key: "Type Idantifiant", value: client.typeIDNT },
        { key: "Identifiant", value: client.username },
        { key: "Email", value: client.email },
        { key: "Numéro de Téléphone", value: client.numTel },
        { key: "Adresse", value: client.adresse },

    ];

    const options = ["Modifier", "Supprimer"];
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    /*  const handleRepondre = () => {
 
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
     }; */

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



    return (
        <Card variant="outlined" sx={{ width: 450 }}>
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
                            Détails client
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
                <Timeline sx={{ p: 0 }}>
                    {flattenedClient.map(({ key, value }) => (
                        <TimelineItem key={key} sx={{ display: "flex", alignItems: "center" }}>
                            <TimelineOppositeContent
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#ed3026",
                                    fontSize: "30px",
                                    fontWeight: "bold",
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>{key}</Typography>
                            </TimelineOppositeContent>

                            <TimelineContent
                                color="text.secondary"
                                sx={{
                                    textAlign: "left",
                                    alignItems: "flex-start",
                                    fontSize: "14px",

                                }}
                            >
                                <Typography >{value}</Typography>

                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>



                <Dialog open={openDialog} onClose={handleCloseDialog} maxHeight="md">
                    <DialogTitle>Envoyer un e-mail</DialogTitle>
                    <DialogContent sx={{ height: "100%" }}>
                        <TextField
                            label="Adresse e-mail"
                            fullWidth
                            //value={reclamation.user.email}
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
                            //onClick={}
                            color="primary"
                        //disabled={!emailContent}
                        >
                            Envoyer
                        </Button>
                    </DialogActions>

                </Dialog>

            </CardContent>
        </Card>
    );
}

export default clientDetails