import React, { FC, useContext } from "react";
import { LoginContext } from "./context/LoginContext";
import Login from "./Login";

const RouteProtector: FC = (props) => {
  const { isAuthenticated } = useContext(LoginContext);

  return <>{isAuthenticated ? props.children : <Login />}</>;
};

export default RouteProtector;
