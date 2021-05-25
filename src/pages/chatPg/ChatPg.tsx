import React, { useState, useEffect, useContext } from "react";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./Chat.module.scss";
import townSquareLogo from "./assets/townSquareLogo.svg";
import { connect } from "react-redux";
import groupChatIcon from "./assets/groupChatIcon.svg";
import {
  doChatRemove,
  doChatTypeUpdate,
} from "../../store/redux/actions/chat_act";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";
import Error from "../../components/Error/Error";

function Chat(props: any) {
  const history = useHistory();
  const { cerror, setCerror } = useContext(LoginContext);
  useEffect(() => {
    return () => {
      setCerror("");
    };
  }, []);
  function mapThenRedirect() {
    props.doChatTypeUpdateProp({ new: true, group: true });
    history.push("/groupchat");
  }
  return (
    <>
      <div className="pagePadding">
        <Navbar currentPath={window.location.pathname} />
        <SubNav>
          <img className={styles.townSquareLogo} src={townSquareLogo} />
          <p>Chat</p>
          <button
            className={styles.startGroupChatButton}
            onClick={mapThenRedirect}
          >
            New Group Chat
            <img className={styles.groupChatIcon} src={groupChatIcon} />
          </button>
        </SubNav>
      </div>
      <div className={styles.chatContainer}>
        {cerror && <Error message={cerror} />}
        <ChatList />
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRemoveChatProp: () => dispatch(doChatRemove()),
    doChatTypeUpdateProp: (chatType: any) =>
      dispatch(doChatTypeUpdate(chatType)),
  };
};
export default connect(null, mapDispatchToProps)(Chat);

// export default Chat;
