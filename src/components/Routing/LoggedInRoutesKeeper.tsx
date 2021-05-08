import React, { FC, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Login from "../../pages/login/LoginPg";
import Error from "../../components/Error/Error";

const LoggedInRoutesKeeper = (props: any) => {
  const { cerror, currentUser } = useContext(LoginContext);

  if (cerror) {
    return <Error message={cerror} />;
  } else {
    return <>{currentUser ? props.children : <Login />}</>;
  }

  // return props.children;
};

export default LoggedInRoutesKeeper;
