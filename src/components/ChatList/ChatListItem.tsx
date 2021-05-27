import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./ChatList.module.scss";
import classes from "./chatListItem.module.scss";
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
  const conversation = props.convo;

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
        return (
          <img
            className={classes.avatar}
            key={g.userId}
            src={g.avatar}
            height="50px"
            width="50px"
          />
        );
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

  let memberNames;
  if (conversation.members.length > 1) {
    memberNames = "";
    for (let i = 0; i < conversation.members.length; i++) {
      if (i === 0) {
        memberNames += `${conversation.members[i].username}`;
      } else if (i > 1) {
        memberNames += ` and ${conversation.members.length - 2} other`;
        break;
      } else {
        memberNames += `, ${conversation.members[i].username}`;
      }
    }
  } else {
    if (conversation.members[0]) {
      memberNames = conversation.members[0].username;
    }
  }

  let latestMessage;
  if (conversation.latestMessage[0]) {
    if (conversation.latestMessage[0].userId === props.currentUser.userId) {
      latestMessage = `You: ${conversation.latestMessage[0].text}`;
    } else {
      latestMessage = conversation.latestMessage[0].text;
    }
  } else {
    latestMessage = "Click to start chatting.";
  }

  function checkIfToday(messageTimeStamp: any) {
    const currentDate = new Date().toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
    });

    const messageDate = new Date(messageTimeStamp).toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    if (messageDate === currentDate) console.log("it's the same day");
    return messageDate === currentDate;
  }

  let latestMessageTimeStamp;
  if (conversation.latestMessage[0]) {
    if (checkIfToday(conversation.latestMessage[0].createdAt)) {
      latestMessageTimeStamp = new Date(conversation.latestMessage[0].createdAt)
        .toTimeString()
        .slice(0, 5);
      console.log(latestMessageTimeStamp);
    } else {
      latestMessageTimeStamp = new Date(conversation.latestMessage[0].createdAt)
        .toLocaleDateString("en-US", {
          timeZone: "America/Los_Angeles",
        })
        .slice(0, 4);
    }
  }

  return (
    <>
      <div className={classes.ChatCard} onClick={mapThenRedirect}>
        <div className={classes.avatarContainer}>{getAvatars()}</div>
        <div className={classes.chatListItemContainer}>
          <p>{memberNames}</p>
          <p className={classes.chatText}>{latestMessage}</p>
        </div>
        <div className={classes.chatTimeStamp}>{latestMessageTimeStamp}</div>
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
