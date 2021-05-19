import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { getAllConversationsByUserId } from "../../utils/api/people.api";
import _ from "lodash";
import { Link } from "react-router-dom";
import styles from "./ChatList.module.scss";
import ChatListItem from "./ChatListItem";

function ChatList() {
  const [chatList, setChatList] = useState(null) as any;

  const { currentUser, showModal, setShowModal, setCerror, setCurrentUser } =
    useContext(LoginContext);

  useEffect(() => {
    getAllConversationsByUserId((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("1111111111111111111111");
        console.log("1111111111111111111111");
        console.log(result);

        setChatList(result);
      }
    });
  }, []);

  if (chatList) {
    return (
      <div>
        {chatList.map((c: any) => {
          // return <div key={li.id}>{createListItem(li)}</div>;
          return <ChatListItem key={c.conversationId} convo={c} />;
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
}

export default ChatList;
