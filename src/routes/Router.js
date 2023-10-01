import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));
const LoginForm = lazy(() => import("../views/auhtentification/Authentification.js"));
const SignInForm = lazy(() => import("../views/auhtentification/pages/SignInForm.js"));
const SignUpForm = lazy(() => import("../views/auhtentification/pages/SignUpForm.js"));



/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));

// form elements
const ExAutoComplete = lazy(() =>
  import("../views/FormElements/ExAutoComplete.js")
);
const ExButton = lazy(() => import("../views/FormElements/ExButton.js"));
const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox.js"));
const ExRadio = lazy(() => import("../views/FormElements/ExRadio.js"));
const ExSlider = lazy(() => import("../views/FormElements/ExSlider.js"));
const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch.js"));
const Reclamation = lazy(() => import("../views/Reclammation/reclamationsList.js"));
const Clients = lazy(() => import("../views/Clients/clientList.js"));
const Sinistres = lazy(() => import("../views/Sinistres/SinistresList.js"));
const Devis = lazy(() => import("../views/Devis/DevisList.js"));
const Gestionnaires = lazy(() => import("../views/Gestionnaires/GestionnaireList.js"));
const Profil = lazy(() => import("../views/Profil/viewProfil.js"));
const Garanties = lazy(() => import("../views/Garanties/GarantiesList.js"));






// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));

const PrivateRoute = ({ element, condition, fallback }) => {
  return condition ? element : fallback;
};
/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <Navigate to="/login/signin" />  // Redirige vers "/login/signin"
  },
  {
    path: "/login",
    element: <LoginForm />,
    children: [
      { path: "signup", element: <SignUpForm /> },
      { path: "signin", element: <SignInForm /> },
      { path: "signinGest", element: <SignInForm /> },
    ],
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/Clients", exact: true, element: <Clients /> },
      {
        path: "dashboards/dashboard1",
        element: (
          <PrivateRoute
            element={localStorage.getItem('userRole') === "ROLE_ADMIN" ? <Dashboard1 /> : <Navigate to="/Clients" />}
            condition={localStorage.getItem('userRole') === "ROLE_ADMIN" || localStorage.getItem('userRole') === "ROLE_GESTIONNAIRE"}
            fallback={<Navigate to="/Clients" />}
          />
        ),
      },
      { path: "tables/basic-table", element: <BasicTable /> },
      { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      { path: "/form-elements/button", element: <ExButton /> },
      { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      { path: "/form-elements/radio", element: <ExRadio /> },
      { path: "/form-elements/slider", element: <ExSlider /> },
      { path: "/form-elements/switch", element: <ExSwitch /> },
      { path: "/Reclamations", element: <Reclamation /> },
      { path: "/Sinistres", element: <Sinistres /> },
      { path: "/Devis", element: <Devis /> },
      { path: "/Gestionnaires", element: <Gestionnaires /> },
      { path: "/Profil", element: <Profil /> },
      { path: "/Garanties", element: <Garanties /> },

    ],
  },
];



export default ThemeRoutes;
