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
import { login } from "../../utils/api/auth.api";
import Login from "../../pages/login/LoginPg";
import socket from "../../utils/socketIO.util";

const Routing = () => {
  const { cerror, setCurrentUser, currentUser, setSignUpStatus, setCerror } =
    useContext(LoginContext);

  return (
    <Router>
      <Switch>
        <Route path="/register">
          {cerror && <Error message={cerror} />}
          <Register />
        </Route>
        <Route path="/api/user/verify">
          {cerror && <Error message={cerror} />}
          <Verify />
        </Route>
        <LoggedInRoutesKeeper>
          {cerror ? <Error message={cerror} /> : <LoggedInRoutes />}
        </LoggedInRoutesKeeper>
      </Switch>
    </Router>
  );
  // } else {
  //   return <Login />;
  // }
};

export default Routing;
