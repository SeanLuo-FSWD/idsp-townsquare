import React, { useState, useEffect } from "react";
import "./App.scss";
import { LoginContext } from "./store/context/LoginContext";
import Routing from "./components/Routing/Routing";
import { IUser } from "./interfaces/IUser";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [modalProps, setModalProps] = useState(false);
  const [cerror, setCerror] = useState("");
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  return (
    <LoginContext.Provider
      value={{
        userId,
        setUserId,
        isAuthenticated,
        username,
        setUsername,
        setIsAuthenticated,
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
      }}
    >
      <Routing />
    </LoginContext.Provider>
  );
}

export default App;
