import React from "react";
import { Route } from "react-router-dom";
import Home from "../../pages/index/FeedPg";
import Person from "../../pages/person/Person";
import Users from "../../pages/users/UsersPg";
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

      <Route path="/person/:id" children={<Person />}></Route>
    </>
  );
};

export default ReactRouterSetup;
