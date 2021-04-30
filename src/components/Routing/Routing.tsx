import React, { useState, useEffect, useContext } from "react";
import LoggedInRoutesKeeper from "./LoggedInRoutesKeeper";
import LoggedInRoutes from "./LoggedInRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../../pages/register/register";
import Navbar from "../Navbar/Navbar";
import { authenticate } from "../../utils/api/auth.api";
import { LoginContext } from "../../store/context/LoginContext";

const Routing = () => {
  const {
    signUpStatus,
    setSignUpStatus,
    setUsername,
    setIsAuthenticated,
    setUserId,
  } = useContext(LoginContext);

  useEffect(() => {
    authenticate((err: Error, result: any) => {
      if (err) {
        console.log(err);
        console.log("axios request error, or server down?");
      } else {
        setIsAuthenticated(true);
        setSignUpStatus(false);
        setUsername(result.data.username);
        setUserId(result.data.userId);
      }
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        {/* <Route path="/login">
          <Login />
        </Route> */}
        <LoggedInRoutesKeeper>
          <Navbar />
          <LoggedInRoutes />
        </LoggedInRoutesKeeper>
      </Switch>
    </Router>
  );
};

export default Routing;
