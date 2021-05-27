import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { getAllConversationsByUserId } from "../../utils/api/people.api";
import _ from "lodash";
import socket from "../../utils/socketIO.util";
import ChatListItem from "./ChatListItem";
import Error from "../../components/Error/Error";
import styles from "./ChatList.module.scss";
import "./loadingIcon.css";

function ChatList() {
  const [chatList, setChatList] = useState(null) as any;

  const { cerror, setCerror, currentUser } = useContext(LoginContext);

  useEffect(() => {
    getAllConversationsByUserId((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setChatList(result);
      }
    });
    socket.on("updateChats", (latestConversations) => {
      setChatList(latestConversations);
    });

    return () => {
      socket.off("updateChats");
    };
  }, []);

  if (chatList) {
    console.log("chatList", chatList);
    return (
      <>
        {chatList.map((c: any) => {
          return <ChatListItem key={c.conversationId} convo={c} currentUser={currentUser} />;
        })}
        {/* {getAvatars(chatList)}
        {chatList.length > 4 && <span>...</span>} */}
      </>
    );
  } else {
    return (
      <>
        <div className="pagePadding">
          <div className={styles.loadingContainer}>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </>
    );
  }
}

export default ChatList;
