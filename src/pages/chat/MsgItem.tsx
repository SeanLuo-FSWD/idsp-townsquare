import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import styles from "./MsgItems.module.scss";
import { Link } from "react-router-dom";
function MsgItem(props: any) {
  const { currentUser, setCerror, setCurrentUser } = useContext(LoginContext);

  if (props.msg.userId === currentUser.userId) {
    return (
      <div className={styles.chatFeedWrapper}>
        <div style={{ display: "flex", justifySelf: "flex-start" }}>
          <Link to={`/person/${props.msg.userId}`}>
            <img
              className={styles.chatMessageAvatar}
              src={props.msg.avatar}
              style={{ width: "60px", height: "60px" }}
            />
          </Link>

          <div>
            <p className={styles.chatTimestamp}>
            {new Date(props.msg.createdAt).toLocaleString("en-US", {
                timeZone: "America/Los_Angeles",
              })}
            </p>
            <p className={styles.messageContentContainer}>{props.msg.text}</p>
          </div>
        </div>
      </div>

    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Link to={`/person/${props.msg.userId}`}>
          <img
            className={styles.chatMessageAvatar}
            src={props.msg.avatar}
            style={{ width: "60px", height: "60px" }}
          />
        </Link>
        <div>
          <div className={styles.chatTimestamp}>
            {new Date(props.msg.createdAt).toLocaleString("en-US", {
              timeZone: "America/Los_Angeles",
            })}
          </div>

          <p className={styles.messageContentContainer}>{props.msg.text}</p>
        </div>
      </div>
    );
  }
}

export default MsgItem;
