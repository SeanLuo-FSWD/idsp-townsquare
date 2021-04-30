import React, { FC, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Login from "../../pages/login/Login";

const LoggedInRoutesKeeper = (props: any) => {
  const { isAuthenticated } = useContext(LoginContext);

  return <>{isAuthenticated ? props.children : <Login />}</>;

  // return props.children;
};

export default LoggedInRoutesKeeper;
