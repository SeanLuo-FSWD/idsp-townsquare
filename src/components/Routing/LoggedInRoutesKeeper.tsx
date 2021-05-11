import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Login from "../../pages/login/LoginPg";
import Error from "../../components/Error/Error";
import { authenticate } from "../../utils/api/auth.api";
import Profile from "../../pages/Profile/Profile";

const LoggedInRoutesKeeper = (props: any) => {
  const { cerror, currentUser, setCurrentUser, setCerror } = useContext(
    LoginContext
  );

  useEffect(() => {
    authenticate((err: Error, result: any) => {
      if (err) {
        // setCerror(err.message);
        console.log(err);
      } else {
        console.log("authentication in LoggedInRoutesKeeper");
        console.log("bbbbbbbbbbbbbbbbbb");
        console.log(result.data);

        setCurrentUser(result.data);
      }
    });
  }, []);

  if (cerror) {
    return <Error message={cerror} />;
  } else {
    // return <>{currentUser ? props.children : <Login />}</>;
    return (
      <>
        {!currentUser ? (
          <Login />
        ) : currentUser.firstTime ? (
          <Profile />
        ) : (
          props.children
        )}
      </>
    );
  }

  // return props.children;
};

export default LoggedInRoutesKeeper;
