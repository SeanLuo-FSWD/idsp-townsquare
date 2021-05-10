import React from "react";
import { Route } from "react-router-dom";
import Home from "../../pages/index/FeedPg";
import Person from "../../pages/person/Person";
// import Users from "../../pages/people/PeoplePg";
import PeoplePg from "../../pages/people/PeoplePg";

import Profile from "../../pages/Profile/Profile";
import ChatPg from "../../pages/chatPg/ChatPg";
import Chat from "../../pages/chat/Chat";

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
        <PeoplePg />
      </Route>

      <Route path="/profile">
        <Profile />
      </Route>

      <Route path="/chatPage">
        <ChatPg />
      </Route>

      <Route path="/person/:id" children={<Person />}></Route>
      <Route path="/post/:postId" children={<Home />}></Route>
      <Route path="/chat/:chatId" children={<Chat />}></Route>
    </>
  );
};

export default ReactRouterSetup;
