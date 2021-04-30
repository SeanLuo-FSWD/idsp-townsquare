import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";
import { logout } from "../../utils/api/auth";
import styles from "./Navbar.module.scss";

function Navbar() {
  const [logoutError, setLogoutError] = useState("");

  const { setUsername, setIsAuthenticated, setUserId } = useContext(
    LoginContext
  );

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
    <div className={`${styles.navBar} flex--space-around`}>
      <div className={styles.navBar__item}>
        <Link to="/">Home</Link>
      </div>
      <div className={styles.navBar__item}>
        <Link to="/users">Users</Link>
      </div>
      <div className={styles.navBar__item}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
