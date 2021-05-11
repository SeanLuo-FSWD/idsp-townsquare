import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import styles from "./SubNav.module.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";

function SubNav(props: any) {
  const {
    currentUser,
    showModal,
    setShowModal,
    setCerror,
    setCurrentUser,
  } = useContext(LoginContext);

  const [showDD, setShowDD] = useState(false);

  function createAlert(alert_obj: any) {
    let text = "";
    let link = "";
    switch (alert_obj.type) {
      case "liked":
        text = `${alert_obj.username} liked your post`;
        link = `/post/${alert_obj.postId}`;
        break;
      case "commented":
        text = `${alert_obj.username} commented on your post`;
        link = `/post/${alert_obj.postId}`;
        break;
      case "followed":
        text = `${alert_obj.username} followed you`;
        link = `/person/${alert_obj.userId}`;
        break;
      default:
        break;
    }

    console.log(link);
    console.log(text);
    return <Link to={link}>{text}</Link>;
  }

  function removeAlert(alertId: string) {
    // let newAlertArr = currentUser.alert.filter((a: any) => {
    //   a.id !== alertId;
    // });

    const newAlertArr = currentUser.alert.filter((a: any) => a.id !== alertId);

    setCurrentUser({ ...currentUser, alert: newAlertArr });
  }

  return (
    <div className={`flex--space-between ${styles.subNav}`}>
      {props.children}
      <div>
        {/* <Badge badgeContent={currentUser.alert.length} color="primary">
          <NotificationsIcon
            onClick={() => {
              setShowDD(!showDD);
            }}
          />
        </Badge> */}
        {showDD && (
          <div className={styles.alert}>
            <ul>
              {currentUser.alert.map((a: any) => {
                return (
                  <li onClick={() => removeAlert(a.id)} key={a.id}>
                    {createAlert(a)}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubNav;
