import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";
import { logout } from "../../utils/api/auth.api";
import styles from "./Navbar.module.scss";

function Navbar(props: any) {
  const [currentPath, setCurrentPath] = useState("");

  const {
    setUsername,
    currentUser,
    setCurrentUser,
    setCerror,
    setIsAuthenticated,
    setUserId,
  } = useContext(LoginContext);
  function handleLogout() {
    logout((err: Error, result: any) => {
      if (err) {
        console.log(err);
        setCerror(err.message);
      } else {
        setCerror("");
        setCurrentUser(null);

        setUsername("");
        setUserId("");
        setIsAuthenticated(false);
      }
    });
  }

  return (
    <div className={`${styles.navBar} flex--space-around`}>
      <div
        className={
          props.currentPath == "/"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/">Home</Link>
      </div>
      <div
        className={
          props.currentPath == "/users"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/users">Users</Link>
      </div>
      <div
        className={
          props.currentPath == "/chat"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/chat">Chat</Link>
      </div>
      <div
        className={
          props.currentPath == "/profile"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/profile">Profile</Link>
      </div>
      {/* <div className={styles.navBar__item}>
        <button onClick={handleLogout}>Logout</button>
      </div> */}
    </div>
  );
}

export default Navbar;
