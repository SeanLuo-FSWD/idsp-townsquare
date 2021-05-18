import React, { useState, useEffect } from "react";
import "./App.scss";
import { LoginContext } from "./store/context/LoginContext";
import Routing from "./components/Routing/Routing";
import { IUser } from "./interfaces/IUser";
import socket from "./utils/socketIO.util";

import io from "socket.io-client";

function App() {
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [modalProps, setModalProps] = useState(false);
  const [cerror, setCerror] = useState("");
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [groupChat, setGroupChat] = useState([]) as any;

  window.onbeforeunload = (event: any) => {
    const e = event || window.event;
    setCerror("");
  };

  useEffect(() => {
    console.log(" ----- useEffect in App.tsx ------- ");
    console.log(currentUser);
    if (currentUser) {
      socket.connect();
    }
    console.log(socket);

    return () => {
      console.log("--- socket disconnected");
      socket.disconnect();
    };
  }, [currentUser]);

  return (
    <LoginContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signUpStatus,
        setSignUpStatus,
        showModal,
        setShowModal,
        modalProps,
        setModalProps,
        cerror,
        setCerror,
        groupChat,
        setGroupChat,
      }}
    >
      <Routing />
    </LoginContext.Provider>
  );
}

export default App;
