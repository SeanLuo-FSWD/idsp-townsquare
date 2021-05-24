import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./chat.module.scss";
import backIcon from "./assets/back.svg";
import {
  getConversationByConversationId,
  getMessagesInConversation,
} from "../../utils/api/realtime.api";
import { LoginContext } from "../../store/context/LoginContext";
import socket from "../../utils/socketIO.util";
import MsgItem from "./MsgItem";
import { doChatRemove, doChatIdAdd } from "../../store/redux/actions/chat_act";
import _ from "lodash";
import Error from "../../components/Error/Error";

function Chat(props: any) {
  const history = useHistory();
  // const [openPortal, setOpenPortal] = useState(false);
  const [inputTxt, setInputTxt] = useState("");
  // const [chatId, setChatId] = useState("") as any;

  const [messages, setMessages] = useState([]) as any;
  const [addedGroup, setAddedGroup] = useState(props.initialChatGroup) as any;
  const [isNew, setIsNew] = useState(false) as any;

  // let goingToFilter = false;
  const { currentUser, cerror, setCerror } = useContext(LoginContext);

  console.log("top chat id --------------------");

  console.log(props.chatId);
  console.log(props.addedGroup);
  console.log(addedGroup);

  useEffect(() => {
    if (!props.chatId && !props.addedGroup && !addedGroup) {
      history.goBack();
    }

    let addedUsersIds: string[] = [];
    if (!props.chatType.group) {
      console.log("private chat");
      console.log(addedGroup);

      for (let i = 0; i < addedGroup.length; i++) {
        addedUsersIds.push(addedGroup[i].userId);
      }
    } else {
      console.log("group chat");
      console.log(props.addedGroup);
      for (let i = 0; i < props.addedGroup.length; i++) {
        addedUsersIds.push(props.addedGroup[i].userId);
      }
    }

    getConversationByConversationId(
      addedUsersIds,
      (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
        } else {
          socket.emit("enter chatroom", { conversationId: result._id });
          console.log(
            "-------->>> getConversationByConversationId <<<---------"
          );
          console.log(result);

          props.onAddChatIdProp(result._id);

          if (!result.isNewConversation) {
            console.log("==========================================");
            console.log(
              "Existing chat: either private, or group member unchanged"
            );
            console.log("==========================================");
            getMessagesInConversation(
              // props.chatId,
              result._id,
              (err: Error, result: any) => {
                if (err) {
                  setCerror(err.message);
                } else {
                  setMessages(buildMessages(result.messages).reverse());
                  setIsNew(false);
                }
              }
            );
          } else {
            console.log("==========================================");
            console.log("NEW chat: either private, or group");
            console.log("==========================================");
            setIsNew(true);
          }
        }
      }
    );

    socket.on("received", (data: any) => {
      console.log("msg received received received ");
      console.log(data.newMsg);

      setMessages((messages: any) => {
        const merged_msg = [
          ...messages.slice(-25),
          ...buildMessages([data.newMsg]),
        ];

        console.log(merged_msg);

        return merged_msg;
      });

      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      props.onRemoveChatProp();
      socket.emit("leaveChatroom", {
        conversationId: props.chatId,
      });
      setCerror("");
      socket.off("received");
      socket.off("addNewMemberToGroup");
    };
  }, []);

  function buildMessages(msgArr: any) {
    let msgObjArr: any = [];

    if (isNew && props.chatType.group) {
      msgArr.forEach((m: any) => {
        for (let i = 0; i < props.addedGroup.length; i++) {
          if (m.userId === props.addedGroup[i].userId) {
            m["avatar"] = props.addedGroup[i].avatar;
            m["username"] = props.addedGroup[i].username;
            msgObjArr.push(m);
            break;
          }
          if (m.userId === currentUser.userId) {
            m["avatar"] = currentUser.avatar;
            m["username"] = currentUser.username;
            msgObjArr.push(m);
            break;
          }
        }
      });
    } else {
      // changed from addedGroup to props.addedGroup so messages for new group chat can be received
      msgArr.forEach((m: any) => {
        for (let i = 0; i < addedGroup.length; i++) {
          if (m.userId === addedGroup[i].userId) {
            m["avatar"] = addedGroup[i].avatar;
            m["username"] = addedGroup[i].username;
            msgObjArr.push(m);
            break;
          }
          if (m.userId === currentUser.userId) {
            m["avatar"] = currentUser.avatar;
            m["username"] = currentUser.username;
            msgObjArr.push(m);
            break;
          }
        }
      });
    }

    return msgObjArr;
  }

  function getAvatars(addedGroup: any) {
    console.log("getAvatars getAvatars getAvatars");
    console.log(addedGroup);

    const length = addedGroup.length > 4 ? 4 : addedGroup.length;

    let selectGroup: any = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(addedGroup[i]);
    }

    const arr_img = selectGroup.map((g: any) => {
      return <img key={g.userId} src={g.avatar} height="50px" width="50px" />;
    });

    return arr_img;
  }

  const submitMessage = (e: any) => {
    e.preventDefault();

    if (!inputTxt) return;
    console.log("submit message chatId ====");
    console.log(props.chatId);

    socket.emit("chat message", {
      userId: currentUser.userId,
      conversationId: props.chatId,
      text: inputTxt,
    });

    setInputTxt("");
  };

  function toChatPage() {
    history.push("/chatPage");
  }

  return (
    <>
      <div>
        <SubNav className="flex--space-between">
          <div className={styles.chatSubNavWrapper}>
            {props.addedGroup.length > 1 ? (
              <div>
                <img src={backIcon} onClick={toChatPage} />
              </div>
            ) : (
              <img
                src={backIcon}
                onClick={() => {
                  history.goBack();
                }}
              />
            )}

            <div className={styles.chatNavUserInfo}>
              Chatting with:
              <div className={styles.avatarNav}>
                {props.chatType.new && props.chatType.group
                  ? getAvatars(props.addedGroup)
                  : getAvatars(addedGroup)}
                {addedGroup.length > 4 && <span>...</span>}
              </div>
            </div>
          </div>
        </SubNav>
        {cerror && <Error message={cerror} />}

        <div className={styles.messageContainer}>
          <div className={styles.messageBox}>
            <div className={styles.chatRows}>
              {messages.map((m: any) => {
                return <MsgItem key={m._id} msg={m} />;
              })}
            </div>

            <form
              onSubmit={submitMessage}
              style={{ display: "flex", bottom: "0" }}
            >
              <div className={styles.chatFieldContainer}>
                <input
                  className={styles.messageField}
                  type="text"
                  id="inputTxt"
                  name="inputTxt"
                  value={inputTxt}
                  style={{ flex: "1" }}
                  onChange={(e) => setInputTxt(e.target.value)}
                />
                <button className={styles.sendButton} type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Navbar currentPath={window.location.pathname} />
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    chatId: state.chatState.chatId,
    addedGroup: state.chatState.addedGroup,
    error: state.chatState.error,
    chatType: state.chatState.chatType,
    initialChatGroup: state.chatState.initialChatGroup,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddChatIdProp: (chatId: string) => dispatch(doChatIdAdd(chatId)),
    onRemoveChatProp: () => dispatch(doChatRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
// export default Chat;
