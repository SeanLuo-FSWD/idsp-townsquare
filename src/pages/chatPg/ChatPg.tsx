import React, { useState, useEffect, useContext } from "react";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./Chat.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  doChatRemove,
  doChatTypeUpdate,
} from "../../store/redux/actions/chat_act";
import { useHistory, useParams } from "react-router-dom";

function Chat(props: any) {
  const history = useHistory();

  // useEffect(() => {
  //   props.onRemoveChatProp();
  // }, []);

  function mapThenRedirect() {
    props.doChatTypeUpdateProp({ new: true, group: true });
    history.push("/groupchat");
  }
  return (
    <>
      <div>
        <Navbar currentPath={window.location.pathname} />
        <SubNav>
          <p>Chat</p>
          <button className={styles.startGroupChatButton} onClick={mapThenRedirect}>
            {/* <Link to="/groupchat">Start group Chat</Link> */}
            Start group Chat
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRemoveChatProp: () => dispatch(doChatRemove()),
    doChatTypeUpdateProp: (chatType: any) =>
      dispatch(doChatTypeUpdate(chatType)),
  };
};
export default connect(null, mapDispatchToProps)(Chat);

// export default Chat;
