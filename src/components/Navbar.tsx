import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../store/context/LoginContext";
import { logout } from "../utils/api/auth";

function Navbar() {
  const [logoutError, setLogoutError] = useState("");

  const {
    signUpStatus,
    setSignUpStatus,
    setUsername,
    setIsAuthenticated,
    setUserId,
  } = useContext(LoginContext);

  function handleLogout() {
    logout((err: Error, result: any) => {
      if (err) {
        console.log(err);
        setLogoutError(err.message);
      } else {
        setLogoutError("");

        // Can I get username back here?
        console.log("LOGOUT result message");
        console.log(result);
        setUsername("");
        setUserId("");
        setIsAuthenticated(false);
      }
    });
  }
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
