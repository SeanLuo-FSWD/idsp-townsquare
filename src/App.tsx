import React, { useState, useEffect } from "react";
import "./App.scss";
import { LoginContext } from "./store/context/LoginContext";
import Routing from "./components/Routing/Routing";
import { IUser } from "./interfaces/IUser";

function App() {
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [modalProps, setModalProps] = useState(false);
  const [cerror, setCerror] = useState("");
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  window.onbeforeunload = (event: any) => {
    const e = event || window.event;
    setCerror("");
  };

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
      }}
    >
      <Routing />
    </LoginContext.Provider>
  );
}

export default App;
