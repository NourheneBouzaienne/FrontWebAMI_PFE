// import { createTheme } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import shadows from "./Shadows";

// ##############################

// // // Global Variables
// ##############################

const SidebarWidth = 265;
const TopbarHeight = 70;

const baseTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#204393",
      light: "#e6f4ff",
      red: "#ed3026",
    },
    secondary: {
      //main: "#1e4db7",
      main: "#ed3026",

    },
    light: {
      main: "#fff",
    },
    background: {
      default: "#fff",
    },
    success: {
      main: "#39cb7f",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#ed3026",
    },
    error: {
      main: "#fc4b6c",
    },
    /* red: {
      main: "#ed3026",
    }, */
    warning: {
      main: "#fdd43f",
      contrastText: "#ffffff",
    },
    text: {
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
  },
  shape: {
    borderRadius: 5,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
          margin: 0,
          padding: 0,
        },
        "#root": {
          height: "100%",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "15px !important",
          paddingRight: "15px !important",
          maxWidth: "1600px",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: "9px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "14px",
          margin: "15px",
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "40px",
        },
      },
    },

    MuiGridItem: {
      styleOverrides: {
        root: {
          paddingTop: "30px",
          paddingLeft: "30px !important",
        },
      },
    },
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: TopbarHeight,
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  status: {
    danger: "#e53e3e",
  },
  typography,
  shadows,
});

export { TopbarHeight, SidebarWidth, baseTheme };
