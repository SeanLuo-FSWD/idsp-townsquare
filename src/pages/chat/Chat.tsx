import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";
import PortalModal from "../../UI/PortalModal";
import Overlay from "../../UI/Overlay";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getConversationByConversationId,
  getMessagesInConversation,
} from "../../utils/api/realtime.api";
import { LoginContext } from "../../store/context/LoginContext";
import socket from "../../utils/socketIO.util";
import MsgItem from "./MsgItem";
import socketIO from "socket.io-client";
import {
  doChatRemove,
  doChatUpdate,
  doChatInitialChatGroup,
  doChatIdAdd,
} from "../../store/redux/actions/chat_act";
import _ from "lodash";

function Chat(props: any) {
  const history = useHistory();
  // const [openPortal, setOpenPortal] = useState(false);
  const [inputTxt, setInputTxt] = useState("");
  // const [chatId, setChatId] = useState("") as any;

  const [messages, setMessages] = useState([]) as any;
  const [addedGroup, setAddedGroup] = useState(props.initialChatGroup) as any;
  const [isNew, setIsNew] = useState(false) as any;

  // let goingToFilter = false;
  const { currentUser, setModalProps, setShowModal, setCerror } =
    useContext(LoginContext);

  console.log("top chat id --------------------");

  console.log(props.chatId);

  useEffect(() => {
    console.log("3333333333333333");
    console.log("3333333333333333");
    console.log(props.initialChatGroup);
    console.log(props.addedGroup);
    console.log(props.chatId);
    console.log(props.chatType);

    console.log("3333333333333333");
    console.log("3333333333333333");

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
                  console.log(
                    "getMessagesInConversation getMessagesInConversation getMessagesInConversation"
                  );

                  console.log(result);

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
          ...messages.slice(-4),
          ...buildMessages([data.newMsg]),
        ];

        console.log(merged_msg);

        return merged_msg;
      });

      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      console.log("cleanup cleanup cleanup cleanup");
      console.log(!props.chatType.new);

      // if (props.chatType === "private") {
      // if (!props.chatType.new) {
      //   console.log("onRemoveChatProp");

      props.onRemoveChatProp();
      // }

      socket.emit("leaveChatroom", {
        conversationId: props.chatId,
      });

      socket.off("received");
      socket.off("addNewMemberToGroup");
    };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log("chatIdddddddd");
  //     console.log(chatId);
  //     socket.emit("leaveChatroom", {
  //       conversationId: chatId,
  //     });
  //   };
  // }, [chatId]);

  // function togglePortalProp() {
  //   setOpenPortal(false);
  // }

  function buildMessages(msgArr: any) {
    let msgObjArr: any = [];

    console.log("addedGroup addedGroup addedGroup");

    console.log(addedGroup);

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
      // return <img key={g._id} src={g.avatar} height="50px" width="50px" />;
      return <img key={g.userId} src={g.avatar} height="50px" width="50px" />;
    });

    return arr_img;
  }

  // const updateTextInput = (e: any) => {
  //   e.preventDefault();
  //   setInputTxt(e.target.value);
  // }

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

  console.log("before return return return");
  console.log(props.initialChatGroup);

  console.log(addedGroup);

  return (
    <>
      <div>
        <SubNav className="flex--space-between">
          {/* Changed from addedGroup to props.addedGroup as that's what Groupchat uses. */}
          {props.addedGroup.length > 1 ? (
            <div>
              <button onClick={toChatPage}>Go back</button>
              {/* <button onClick={addUserFilter}>Add user</button> */}
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  history.goBack();
                }}
              >
                Go back
              </button>
            </div>
          )}

          <p>
            {/* Chatting with: {getAvatars(addedGroup)} */}
            Chatting with:
            {props.chatType.new && props.chatType.group
              ? getAvatars(props.addedGroup)
              : getAvatars(addedGroup)}
            {/* {getAvatars(props.initialChatGroup)} */}
            {addedGroup.length > 4 && <span>...</span>}
          </p>
        </SubNav>

        <div style={{ position: "relative" }}>
          <div>
            {messages.map((m: any) => {
              return <MsgItem key={m._id} msg={m} />;
            })}
          </div>

          <form
            onSubmit={submitMessage}
            style={{ display: "flex", bottom: "0" }}
          >
            <input
              type="text"
              id="inputTxt"
              name="inputTxt"
              value={inputTxt}
              style={{ flex: "1" }}
              onChange={(e) => setInputTxt(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <Navbar currentPath={window.location.pathname} />

      {/* <PortalModal
        message="Are you sure to leave? This empty chat won't be saved."
        isOpen={openPortal}
        onClose={() => setOpenPortal(false)}
      >
        <button
          onClick={() => {
            document.body.classList.remove("disable_scroll");
            history.goBack();
          }}
        >
          Leave
        </button>
      </PortalModal>
      {openPortal && <Overlay togglePortalProp={togglePortalProp} />} */}
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
