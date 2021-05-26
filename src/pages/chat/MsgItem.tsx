import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import styles from "./MsgItems.module.scss";
import { Link } from "react-router-dom";

function MsgItem(props: any) {
  const { currentUser, setCerror, setCurrentUser } = useContext(LoginContext);

  function checkIfToday(messageTimeStamp: any) {
    console.log("messageTimeStamp", messageTimeStamp);
    const currentDate = new Date().toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
    });

    const messageDate = new Date(messageTimeStamp).toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles"
    });

    return messageDate === currentDate;
  }

  if (props.msg.userId === currentUser.userId) {
    return (
      <div className={styles.selfContainer}>
        <div className={styles.selfMessageWrapper}>
          <div className={styles.selfMessageContainer}>
            <p className={styles.messageContentContainer}>{props.msg.text}</p>
            <p className={styles.chatTimestamp}>
              {
                checkIfToday(props.msg.createdAt)?
                new Date(props.msg.createdAt).toTimeString().slice(0, 5) :
                new Date(props.msg.createdAt).toLocaleDateString("en-US", {
                  timeZone: "America/Los_Angeles"
                }).slice(0, 4)
              }
            </p>
          </div>
        </div>
        <div className={styles.selfAvatarContainer}>
          <Link to={`/person/${props.msg.userId}`}>
            <img
              className={styles.chatMessageAvatar}
              src={props.msg.avatar}
            />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          <Link to={`/person/${props.msg.userId}`}>
            <img
              className={styles.chatMessageAvatar}
              src={props.msg.avatar}
            />
          </Link>
        </div>
        <div>
          <div className={styles.messageContainer}>
            <p className={styles.messageContentContainer}>{props.msg.text}</p>
            <p className={styles.chatTimestamp}>
              {
                checkIfToday(props.msg.createdAt)?
                new Date(props.msg.createdAt).toTimeString().slice(0, 5) :
                new Date(props.msg.createdAt).toLocaleDateString("en-US", {
                  timeZone: "America/Los_Angeles"
                }).slice(0, 4)
              }
            </p>
          </div>
        </div>
    </div>
    );
  }
}

export default MsgItem;
