import React, { useState, useEffect, useContext } from "react";
import LoggedInRoutesKeeper from "./LoggedInRoutesKeeper";
import LoggedInRoutes from "./LoggedInRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../../pages/register/RegisterPg.page";
import Navbar from "../Navbar/Navbar";
import { authenticate } from "../../utils/api/auth.api";
import { LoginContext } from "../../store/context/LoginContext";
import Error from "../../components/Error/Error";
import Verify from "../../pages/verify/Verify";

const Routing = () => {
  const { cerror, setCurrentUser, currentUser, setSignUpStatus, setCerror } =
    useContext(LoginContext);

  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/user/verify">
          <Verify />
        </Route>
        <LoggedInRoutesKeeper>
          <LoggedInRoutes />
        </LoggedInRoutesKeeper>
      </Switch>
    </Router>
  );
};

export default Routing;
