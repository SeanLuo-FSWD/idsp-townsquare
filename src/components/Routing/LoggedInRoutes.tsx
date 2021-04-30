import React from "react";
import { Route } from "react-router-dom";
import Home from "../../pages/index/Feed";
import Users from "../../pages/users/Users";
const ReactRouterSetup = () => {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>

      {/* 
        <Route path="/" render={(props) => <Home {...props} />} />
      */}

      <Route path="/users">
        <Users />
      </Route>
    </>
  );
};

export default ReactRouterSetup;
