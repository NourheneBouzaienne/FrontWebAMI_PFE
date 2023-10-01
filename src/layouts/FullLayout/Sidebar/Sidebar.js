
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";
import Menuitems from "./data";
import Buynow from "./Buynow";



const Sidebar = (props) => {
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  //const userRole = getUserRole(); // Obtenez le rôle de l'utilisateur


  const userRole = localStorage.getItem('userRole');
  console.log(userRole)

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
      <Link to="/">
        <Box sx={{ display: "flex", alignItems: "Center" }}>
          <LogoIcon />
        </Box>
      </Link>

      <Box>
        <List sx={{ mt: 4 }}>
          {Menuitems.map((item, index) => {
            // Vérifier si l'élément doit être affiché en fonction du rôle de l'utilisateur

            if (userRole && item.roles.includes(userRole)) {
              return (
                <List component="li" disablePadding key={item.title}>
                  <ListItem
                    onClick={() => handleClick(index)}
                    button
                    component={NavLink}
                    to={item.href}
                    selected={pathDirect === item.href}
                    sx={{
                      mb: 1,
                      ...(pathDirect === item.href && {
                        color: "white",
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`,
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ...(pathDirect === item.href && { color: "white" }),
                      }}
                    >
                      <item.icon width="20" height="20" />
                    </ListItemIcon>
                    <ListItemText>{item.title}</ListItemText>
                  </ListItem>
                </List>
              );
            } else {
              return null; // Ne pas afficher l'élément s'il ne correspond pas au rôle de l'utilisateur
            }
          })}
        </List>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  } else {
    return (
      <Drawer
        anchor="left"
        open={props.isMobileSidebarOpen}
        onClose={props.onSidebarClose}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
        variant="temporary"
      >
        {SidebarContent}
      </Drawer>
    );
  }
};

export default Sidebar;
