import React from "react";
import LoggedInRoutesKeeper from "./LoggedInRoutesKeeper";
import LoggedInRoutes from "./LoggedInRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../pages/register/register";
import Navbar from "../components/Navbar";

const Routing = () => {
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
