import React, { useState } from "react";
import "./App.css";
import { LoginContext } from "./store/context/LoginContext";
import Routing from "./components/Routing";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [signUpStatus, setSignUpStatus] = useState(false);

  return (
    <LoginContext.Provider
      value={{
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
