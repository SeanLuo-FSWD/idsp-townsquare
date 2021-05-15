import React, { useState, useEffect, useContext } from "react";
import LoggedInRoutesKeeper from "./LoggedInRoutesKeeper";
import LoggedInRoutes from "./LoggedInRoutes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../../pages/register/RegisterPg.page";
import Navbar from "../Navbar/Navbar";
import { authenticate } from "../../utils/api/auth.api";
import { LoginContext } from "../../store/context/LoginContext";
import Error from "../../components/Error/Error";
import Verify from "../../pages/verify/Verify";
import { login } from "../../utils/api/auth.api";
import Login from "../../pages/login/LoginPg";

const Routing = () => {
  const { cerror, setCurrentUser, currentUser, setSignUpStatus, setCerror } =
    useContext(LoginContext);

  // Faking login for dev, to remove for production and uncomment Below!
  // useEffect(() => {
  //   const user_obj = {
  //     email: "bob@bob.com",
  //     password: "bob@bob.com",
  //   };
  //   login(user_obj, (err: Error, result: any) => {
  //     if (err) {
  //       console.log(err);
  //       setCerror(err.message);
  //     } else {
  //       setCerror("");
  //       setSignUpStatus(false);

  //       console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  //       console.log("fffffffffffffffffffffff");
  //       console.log("loginresult");
  //       console.log(result);

  //       setCurrentUser(result);
  //     }
  //   });
  // }, []);
  // faking login ends

  // if (currentUser) {

  return (
    <Router>
      <Switch>
        <Route path="/register">
          {cerror && <Error message={cerror} />}
          <Register />
        </Route>
        <Route path="/api/user/verify">
          {cerror && <Error message={cerror} />}
          <Verify />
        </Route>
        <LoggedInRoutesKeeper>
          {cerror ? <Error message={cerror} /> : <LoggedInRoutes />}
        </LoggedInRoutesKeeper>
      </Switch>
    </Router>
  );
  // } else {
  //   return <Login />;
  // }
};

export default Routing;
