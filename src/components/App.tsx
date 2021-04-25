import React, { useState } from "react";
import "./style/App.css";
import RouteProtector from "./RouteProtector";
import ProtectedRoutes from "./ProtectedRoutes";
import { LoginContext } from "./context/LoginContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <LoginContext.Provider
      value={{ isAuthenticated, username, setUsername, setIsAuthenticated }}
    >
      <RouteProtector>
        <ProtectedRoutes />
      </RouteProtector>
    </LoginContext.Provider>
  );
}

export default App;
