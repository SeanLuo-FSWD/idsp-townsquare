import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Login from "../../pages/login/LoginPg";
import Error from "../../components/Error/Error";
import { authenticate } from "../../utils/api/auth.api";

const LoggedInRoutesKeeper = (props: any) => {
  const { cerror, currentUser, setCurrentUser, setCerror } = useContext(
    LoginContext
  );

  useEffect(() => {
    authenticate((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        if (result) {
          setCurrentUser(result);
        }
      }
    });
  });

  if (cerror) {
    return <Error message={cerror} />;
  } else {
    return <>{currentUser ? props.children : <Login />}</>;
  }

  // return props.children;
};

export default LoggedInRoutesKeeper;
