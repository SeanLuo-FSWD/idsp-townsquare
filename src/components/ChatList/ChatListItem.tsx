import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import styles from "./ChatList.module.scss";
import classes from "./chatListItem.module.scss";
import groupChatIcon from "./assets/groupChatIcon.svg";
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

  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("fffffffffffffffffffffff");
  console.log(props.convo);

  function getAvatars() {
    const length =
      props.convo.members.length > 2 ? 2 : props.convo.members.length;

    let selectGroup: any = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(props.convo.members[i]);
    }

    let arr_img;

    if (length === 2) {
      arr_img = selectGroup.map((g: any, index: number) => {
        return (
          <div className={classes.groupAvatarWrapper} key={g.userId}>
            <img
              key={g.userId}
              className={classes[`image${index + 1}`]}
              src={g.avatar}
              height="50px"
              width="50px"
            />
          </div>
        );
      });
    } else {
      arr_img = selectGroup.map((g: any, index: number) => {
        return <img key={g.userId} src={g.avatar} height="50px" width="50px" />;
      });
    }

    return arr_img;
  }

  function mapThenRedirect() {
    const chatType =
      props.convo.members.length > 1
        ? { new: false, group: true }
        : { new: false, group: false };
    props.onPropStartChatProp(props.convo.members);
    props.doChatTypeUpdateProp(chatType);

    props.onAddChatIdProp(props.convo.conversationId);

    history.push("/chat");
  }

  return (
    <>
      <div className={classes.ChatCard} onClick={mapThenRedirect}>
        <div className={classes.cardItemWrapper}>
          <div className={classes.avatarContainer}>{getAvatars()}</div>
          <div className={styles.chatListItemContainer}>
            {props.convo.latestMessage.length > 0 && (
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
