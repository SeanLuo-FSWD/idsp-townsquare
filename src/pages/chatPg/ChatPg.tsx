import React from "react";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./Chat.module.scss";

function Chat() {
  return (
    <>
      <div>
        <Navbar currentPath={window.location.pathname} />
        <SubNav>
          <h3>chat page</h3>
        </SubNav>
      </div>
      <ChatList />
    </>
  );
}

export default Chat;
