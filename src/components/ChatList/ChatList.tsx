import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { getAllConversationsByUserId } from "../../utils/api/people.api";
import _ from "lodash";
import { Link } from "react-router-dom";
import styles from "./ChatList.module.scss";
import socket from "../../utils/socketIO.util";
import ChatListItem from "./ChatListItem";
import Error from "../../components/Error/Error";

function ChatList() {
  const [chatList, setChatList] = useState(null) as any;

  const { cerror, setCerror } = useContext(LoginContext);

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
    return (
      <>
        {chatList.map((c: any) => {
          return <ChatListItem key={c.conversationId} convo={c} />;
        })}
        {/* {getAvatars(chatList)}
        {chatList.length > 4 && <span>...</span>} */}
      </>
    );
  } else {
    return (
      <>
        <div className="pagePadding">
          {cerror && <Error message={cerror} />}
          <h2>Loading</h2>
        </div>
      </>
    );
  }
}

export default ChatList;
