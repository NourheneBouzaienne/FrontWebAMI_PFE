import React from "react";
import { NavLink, Outlet } from "react-router-dom";


import './Authentification.css'

import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";

const Authentification = () => {
  return (
    <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="pageSwitcher">
          <NavLink
            to="/login/signin"
            activeClassName="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/login/signup"
            activeClassName="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign Up
          </NavLink>
        </div>

        <div className="formTitle">
          <NavLink
            to="/login/signin"
            activeClassName="formTitleLink-active"
            className="formTitleLink"
          >
            Sign In
          </NavLink>{" "}
          or{" "}
          <NavLink
            to="/login/signup"
            activeClassName="formTitleLink-active"
            className="formTitleLink"
          >
            Sign Up
          </NavLink>
        </div>

        <Outlet /> {/* Rendu du contenu de la route enfant */}
      </div>
    </div>
  );
};

export default Authentification;
