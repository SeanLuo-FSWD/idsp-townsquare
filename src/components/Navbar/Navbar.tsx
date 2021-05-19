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
import chatIcon from "./chat.svg";
import Chat from "../../pages/chatPg/ChatPg";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";
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
          <img className={styles.navIcon} src={homeIcon}></img>
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
          <img className={styles.navIcon} src={usersIcon}></img>
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
          <img className={styles.navIcon} src={chatIcon}></img>
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
          <img className={styles.navIcon} src={settingsIcon}></img>
        </Link>
      </div>
      {/* <div className={styles.navBar__item}>
        <img src={logoutIcon} onClick={handleLogout} />
      </div> */}
    </div>
  );
}

export default Navbar;
