import { Home } from "@material-ui/icons";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.scss";
import homeIcon from "./home.svg";
import settingsIcon from "./settings.svg";
import usersIcon from "./users.svg";
import chatIcon from "./chat.svg";

function Navbar(props: any) {
  return (
    <div className={`${styles.navBar} flex--navBar`}>
      <div
        className={
          props.currentPath === "/"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/">
          <img className={styles.navIcon} src={homeIcon}></img>
        </Link>
      </div>
      <div
        className={
          props.currentPath === "/users"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/users">
          <img className={styles.navIcon} src={usersIcon}></img>
        </Link>
      </div>

      <div
        className={
          props.currentPath === "/chatPage"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/chatPage">
          <img className={styles.navIcon} src={chatIcon}></img>
        </Link>
      </div>
      <div
        className={
          props.currentPath === "/profile"
            ? `${styles.navBar__item} ${styles.active}`
            : `${styles.navBar__item}`
        }
      >
        <Link to="/profile">
          <img className={styles.navIcon} src={settingsIcon}></img>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
