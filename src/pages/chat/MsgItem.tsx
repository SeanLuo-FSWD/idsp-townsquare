import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";

import { Link } from "react-router-dom";
function MsgItem(props: any) {
  const { currentUser, setCerror, setCurrentUser } = useContext(LoginContext);

  if (props.msg.userId === currentUser.userId) {
    return (
      <div style={{ display: "flex", justifySelf: "flex-start" }}>
        <Link to={`/person/${props.msg.userId}`}>
          <img
            src={props.msg.avatar}
            style={{ width: "60px", height: "60px" }}
          />
        </Link>

        <div>
          <p>{props.msg.createdAt}</p>
          <h4>{props.msg.text}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Link to={`/person/${props.msg.userId}`}>
          <img
            src={props.msg.avatar}
            style={{ width: "60px", height: "60px" }}
          />
        </Link>
        <div>
          <p>{props.msg.createdAt}</p>
          <h4>{props.msg.text}</h4>
        </div>
      </div>
    );
  }
}

export default MsgItem;
