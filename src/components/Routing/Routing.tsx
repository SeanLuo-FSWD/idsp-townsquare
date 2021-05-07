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

const Routing = () => {
  const [currentPath, setCurrentPath] = useState("");

  const {
    signUpStatus,
    setSignUpStatus,
    setUsername,
    setCurrentUser,
    setIsAuthenticated,
    setUserId,
    cerror,
  } = useContext(LoginContext);

  // Faking login for dev, to remove for production and uncomment Below!
  // useEffect(() => {
  //   setIsAuthenticated(true);
  //   setSignUpStatus(false);
  //   // setUsername("tester");
  //   // setUserId("1");
  //   setCurrentUser({
  //     id: "1",
  //     username: "bob",
  //     email: "bob@bob.com",
  //     img:
  //       "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
  //     age: 5,
  //     gender: "male",
  //     location: "Burnaby",
  //   });
  // }, []);

  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/verify">
          <Verify />
        </Route>
        {/* <Route path="/login">
          <Login />
        </Route> */}
        <LoggedInRoutesKeeper>
          {/* <Navbar /> */}
          {cerror ? <Error message={cerror} /> : <LoggedInRoutes />}
        </LoggedInRoutesKeeper>
      </Switch>
    </Router>
  );
};

export default Routing;
