import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Login from "../../pages/login/LoginPg";
import Error from "../../components/Error/Error";
import { authenticate } from "../../utils/api/auth.api";
import Profile from "../../pages/Profile/Profile";

const LoggedInRoutesKeeper = (props: any) => {
  const { cerror, currentUser, setCurrentUser, setCerror } =
    useContext(LoginContext);

  useEffect(() => {
    authenticate((err: Error, result: any) => {
      if (err) {
        setCurrentUser(null);
      } else {
        setCurrentUser(result.data);
      }
    });
  }, []);

  // if (cerror) {
  //   return <Error message={cerror} />;
  // } else {
  return (
    <>
      {/* {cerror && <Error message={cerror} />} */}
      {!currentUser ? (
        <Login />
      ) : currentUser.firstTime ? (
        <Profile />
      ) : (
        props.children
      )}
    </>
  );
  // }
};

export default LoggedInRoutesKeeper;
