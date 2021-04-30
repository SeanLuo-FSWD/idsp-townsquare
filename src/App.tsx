import React, { useState, useEffect } from "react";
import "./App.scss";
import { LoginContext } from "./store/context/LoginContext";
import Routing from "./components/Routing/Routing";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [signUpStatus, setSignUpStatus] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        userId,
        setUserId,
        isAuthenticated,
        username,
        setUsername,
        setIsAuthenticated,
        signUpStatus,
        setSignUpStatus,
      }}
    >
      <Routing />
    </LoginContext.Provider>
  );
}

export default App;
