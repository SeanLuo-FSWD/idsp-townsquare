import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";

import { Link } from "react-router-dom";
function MsgItem(props: any) {
  const { currentUser, setCerror, setCurrentUser } = useContext(LoginContext);

  let chatterInfo: any;

  props.chat.chatters.forEach((c: any) => {
    if (c.userId === props.msg.userId) {
      chatterInfo = c;
    }
  });

  if (props.msg.userId === currentUser.userId) {
    console.log("999999999999999999999");
    console.log("999999999999999999999");
    console.log(props.msg);

    return (
      <div style={{ display: "flex", justifySelf: "flex-start" }}>
        <Link to={`/person/${chatterInfo.userId}`}>
          <img
            src={chatterInfo.img}
            style={{ width: "60px", height: "60px" }}
          />
        </Link>

        <div>
          <p>{props.msg.timeStamp}</p>
          <h4>{props.msg.text}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", justifySelf: "flex-end" }}>
        <div>
          <p>{props.msg.timeStamp}</p>
          <h4>{props.msg.text}</h4>
        </div>
        <Link to={`/person/${chatterInfo.userId}`}>
          <img
            src={chatterInfo.img}
            style={{ width: "60px", height: "60px" }}
          />
        </Link>
      </div>
    );
  }
}

export default MsgItem;
