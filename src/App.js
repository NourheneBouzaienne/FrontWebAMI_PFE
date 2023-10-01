import React, { lazy, useEffect } from "react";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import LoginPage from "./views/auhtentification/Authentification"

const SignInForm = lazy(() => import("./views/auhtentification/pages/SignInForm.js"));

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

  // Use the useNavigate hook to get the navigation function
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is empty and if the current route is not the login page
    const shouldRedirectToLogin = !token && location.pathname !== "/login/signin";

    // Redirect to the login page if the token is empty
    if (shouldRedirectToLogin) {
      // Use the navigate function to redirect to "/login/signin"
      // This will change the URL and render the corresponding route
      navigate("/login/signin");
    }
  }, [token, location.pathname, navigate ]);

  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;

  return (
    <ThemeProvider theme={theme}>
      {/* Render the routing result */}
      {routing}
    </ThemeProvider>
  );
};

export default App;
