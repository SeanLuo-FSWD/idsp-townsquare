import React, { useState, useEffect, useContext } from "react";
import LoggedInRoutesKeeper from "./LoggedInRoutesKeeper";
import LoggedInRoutes from "./LoggedInRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../../pages/register/RegisterPg.page";
import Navbar from "../Navbar/Navbar";
import { authenticate } from "../../utils/api/auth.api";
import { LoginContext } from "../../store/context/LoginContext";
import Error from "../../components/Error/Error";

const Routing = () => {
  const [currentPath, setCurrentPath] = useState("");

  const {
    signUpStatus,
    setSignUpStatus,
    setUsername,
    setIsAuthenticated,
    setUserId,
    cerror,
  } = useContext(LoginContext);

  // Faking login for dev, to remove for production and uncomment Below!
  // useEffect(() => {
  //   setIsAuthenticated(true);
  //   setSignUpStatus(false);
  //   setUsername("tester");
  //   setUserId("1");
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
          {/* <Navbar /> */}
          {cerror ? <Error message={cerror} /> : <LoggedInRoutes />}
        </LoggedInRoutesKeeper>
      </Switch>
    </Router>
  );
};

export default Routing;
