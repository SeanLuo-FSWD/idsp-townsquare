import { Home } from "@material-ui/icons";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";
import { logout } from "../../utils/api/auth.api";
import styles from "./Navbar.module.scss";
import homeIcon from "./home.svg";
import settingsIcon from "./settings.svg";
import logoutIcon from "./logoutIcon.svg";
import usersIcon from "./users.svg";
import Chat from "../../pages/chatPg/ChatPg";

function Navbar(props: any) {
  const [currentPath, setCurrentPath] = useState("");

  const { currentUser, setCurrentUser, setCerror } = useContext(LoginContext);
  // function handleLogout() {
  //   logout((err: Error, result: any) => {
  //     if (err) {
  //       console.log(err);
  //       setCerror(err.message);
  //     } else {
  //       setCerror("");
  //       setCurrentUser(null);
  //     }
  //   });
  // }

  return (
    <div className={`${styles.navBar} flex--navBar`}>
      <div
        className={
          props.currentPath == "/"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/">
          <img src={homeIcon}></img>
        </Link>
      </div>
      <div
        className={
          props.currentPath == "/users"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/users">
          <img src={usersIcon}></img>
        </Link>
      </div>
      <div
        className={
          props.currentPath == "/chat"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/chatPage">
          <h3>Chat</h3>
        </Link>
      </div>
      <div
        className={
          props.currentPath == "/profile"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/profile">
          <img src={settingsIcon}></img>
        </Link>
      </div>
      {/* <div className={styles.navBar__item}>
        <img src={logoutIcon} onClick={handleLogout} />
      </div> */}
    </div>
  );
}

export default Navbar;
