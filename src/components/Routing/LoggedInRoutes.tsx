import React from "react";
import { Route } from "react-router-dom";
import Home from "../../pages/index/FeedPg";
import PeoplePg from "../../pages/person/Person";
import Users from "../../pages/people/PeoplePg";
import Profile from "../../pages/Profile/Profile";

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

      <Route path="/profile">
        <Profile />
      </Route>

      <Route path="/person/:id" children={<PeoplePg />}></Route>
    </>
  );
};

export default ReactRouterSetup;
