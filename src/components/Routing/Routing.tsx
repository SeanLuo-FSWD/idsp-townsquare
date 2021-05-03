import React, { useState, useEffect, useContext } from "react";
import LoggedInRoutesKeeper from "./LoggedInRoutesKeeper";
import LoggedInRoutes from "./LoggedInRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../../pages/register/RegisterPg.page";
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

  // Faking login for dev, to remove for production and uncomment Below!
  useEffect(() => {
    setIsAuthenticated(true);
    setSignUpStatus(false);
    setUsername("tester");
    setUserId("tester_id");
  }, []);

  // useEffect(() => {
  //   authenticate((err: Error, result: any) => {
  //     if (err) {
  //       console.log(err);
  //       console.log("axios request error, or server down?");
  //     } else {
  //       if (
  //         result.data.message != "Unauthorized" &&
  //         result.data.username &&
  //         result.data.userId
  //       ) {
  //         setIsAuthenticated(true);
  //         setSignUpStatus(false);
  //         setUsername(result.data.username);
  //         setUserId(result.data.userId);
  //       } else {
  //         console.log("user not authenticated: " + result.data.message);
  //       }
  //     }
  //   });
  // }, []);

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
