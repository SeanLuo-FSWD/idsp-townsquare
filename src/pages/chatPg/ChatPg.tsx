import React, { useState, useEffect, useContext } from "react";
import ChatList from "../../components/ChatList/ChatList";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./Chat.module.scss";
import townSquareLogo from "./assets/townSquareLogo.svg";
import { connect } from "react-redux";
import groupChatIcon from "./assets/groupChatIcon.png";
import plusIcon from "./assets/plus.svg";
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
      <div>
        <Navbar currentPath={window.location.pathname} />
        <SubNav>
          
            {/* Add Group Chat */}
            <div className={styles.plusWrapper}>
              <img className={styles.groupChatIcon} onClick={mapThenRedirect} src={groupChatIcon} />
              <img className={styles.plusIcon} src={plusIcon}/>
            </div>

        </SubNav>

        <div className={styles.chatContainer}>
          {cerror && <Error message={cerror} />}
          <ChatList />
        </div>
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
