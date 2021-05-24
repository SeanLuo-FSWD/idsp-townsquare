import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import styles from "./ChatList.module.scss";
import {
  doChatUpdate,
  doChatIdAdd,
  doChatInitialChatGroup,
  doChatTypeUpdate,
} from "../../store/redux/actions/chat_act";
import { useHistory, useParams } from "react-router-dom";

function ChatListItem(props: any) {
  const [addedGroup, setAddedGroup] = useState([]) as any; // array of ids
  const history = useHistory();

  useEffect(() => {
    setAddedGroup(props.convo.members);
  }, []);

  function getAvatars() {
    const length =
      props.convo.members.length > 4 ? 4 : props.convo.members.length;

    let selectGroup: any = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(props.convo.members[i]);
    }

    const arr_img = selectGroup.map((g: any) => {
      return <img key={g.userId} src={g.avatar} height="50px" width="50px" />;
    });

    return arr_img;
  }

  function mapThenRedirect() {
    const chatType =
      props.convo.members.length > 1
        ? { new: false, group: true }
        : { new: false, group: false };
    console.log("ChatlistItem: mapThenRedirect mapThenRedirect ");
    console.log(props.convo.members);
    console.log("props.convo.conversationId");

    console.log(props.convo.conversationId);
    props.onPropStartChatProp(props.convo.members);
    // props.onSetInitialChatGroup(props.convo.members);
    props.doChatTypeUpdateProp(chatType);

    props.onAddChatIdProp(props.convo.conversationId);

    history.push("/chat");
  }

  return (
    <>
      <div onClick={mapThenRedirect}>
        <div style={{ display: "flex" }}>
          <div>{getAvatars()}</div>
          <div className={styles.chatListItemContainer}>
            {props.convo.latestMessage.length > 0 ? (
              <>
                <div className={styles.chatTimeStamp}>
                  {/* {new Date(props.convo.messages[0].createdAt).toLocaleString( */}
                  {new Date(
                    props.convo.latestMessage[0].createdAt
                  ).toLocaleString("en-US", {
                    timeZone: "America/Los_Angeles",
                  })}
                </div>

                <p>{props.convo.latestMessage[0].text}</p>
              </>
            ) : (
              <>
                <div className={styles.chatTimeStamp}>
                  <span>
                    new conversation created at: &nbsp; <br />
                    {new Date(props.convo.createdAt).toLocaleString("en-US", {
                      timeZone: "America/Los_Angeles",
                    })}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    chatId: state.chatState.chatId,
    addedGroup: state.chatState.addedGroup,
    error: state.chatState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddChatIdProp: (chatId: string) => dispatch(doChatIdAdd(chatId)),
    onPropStartChatProp: (addedGroup: any) =>
      dispatch(doChatUpdate(addedGroup)),
    doChatTypeUpdateProp: (chatType: any) =>
      dispatch(doChatTypeUpdate(chatType)),
    onSetInitialChatGroup: (initialChatGroup: any) =>
      dispatch(doChatInitialChatGroup(initialChatGroup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListItem);
