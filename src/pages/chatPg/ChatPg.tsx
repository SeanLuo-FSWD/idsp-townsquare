import React, { useState, useEffect, useContext } from "react";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./Chat.module.scss";
import { Link } from "react-router-dom";
import GroupChatPg from "../GroupChatPg/GroupChatPg";

function Chat() {
  // const [newGroupChat, setNewGroupChat] = useState(false) as any; // array of ids

  // if (newGroupChat) {
  //   return <GroupChatPg startPage={""} chatId={null} />;
  // }
  return (
    <>
      <div>
        <Navbar currentPath={window.location.pathname} />
        <SubNav>
          <p>Chat</p>
          <button>
            <Link to="/groupchat">Start group Chat</Link>
          </button>
          {/* <button onClick={setNewGroupChat(true)}>Start group Chat</button> */}
        </SubNav>
      </div>
      <div className={styles.chatContainer}>
        <ChatList />
      </div>
    </>
  );
}

export default Chat;
