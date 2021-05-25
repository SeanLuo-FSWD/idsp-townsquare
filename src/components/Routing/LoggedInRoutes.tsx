import React, { useState, useEffect, useContext } from "react";

import { Route } from "react-router-dom";
import Home from "../../pages/index/FeedPg";
import Person from "../../pages/person/Person";
// import Users from "../../pages/people/PeoplePg";
import PeoplePg from "../../pages/people/PeoplePg";

import Profile from "../../pages/Profile/Profile";
import ChatPg from "../../pages/chatPg/ChatPg";
import Chat from "../../pages/chat/Chat";
import { LoginContext } from "../../store/context/LoginContext";
import GroupChatPg from "../../pages/GroupChatPg/GroupChatPg";
import { v4 as uuidv4 } from "uuid";

const ReactRouterSetup = () => {
  const { cerror, setCurrentUser, currentUser, setSignUpStatus, setCerror } =
    useContext(LoginContext);

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

      <Route path="/groupchat">
        <GroupChatPg />
      </Route>

      {/* <Route
        path="/person/:id"
        children={<Person key={uuidv4()} />}
        key={uuidv4()}
      ></Route> */}

      <Route path="/person/:id" key={uuidv4()}>
        <Person key={uuidv4()} />
      </Route>
      <Route path="/post/:postId" children={<Home />}></Route>
      {/* <Route path="/chat/:chatId" children={<Chat />}></Route> */}
      <Route path="/chat" children={<Chat />}></Route>
    </>
  );
};

export default ReactRouterSetup;
