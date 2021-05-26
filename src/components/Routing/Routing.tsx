import React, { useState, useEffect, useContext } from "react";
import LoggedInRoutesKeeper from "./LoggedInRoutesKeeper";
import LoggedInRoutes from "./LoggedInRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../../pages/register/RegisterPg.page";
import Verify from "../../pages/verify/Verify";
import Help from "../../pages/help/Help";
const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/help">
          <Help />
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
