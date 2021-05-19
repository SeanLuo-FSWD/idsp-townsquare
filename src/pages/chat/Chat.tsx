import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";
import PortalModal from "../../UI/PortalModal";
import Overlay from "../../UI/Overlay";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  createConversation,
  getMessagesInConversation,
} from "../../utils/api/realtime.api";
import { LoginContext } from "../../store/context/LoginContext";
import socket from "../../utils/socketIO.util";
import MsgItem from "./MsgItem";
import socketIO from "socket.io-client";
import {
  doChatRemove,
  doChatUpdate,
  doChatInitialIdGroup,
} from "../../store/redux/actions/chat_act";

function Chat(props: any) {
  const history = useHistory();
  // const [chatId, setChatId] = useState("") as any;
  const [openPortal, setOpenPortal] = useState(false);
  // const [addedPeople, setAddedPeople] = useState(props.addedGroup) as any;
  const [inputTxt, setInputTxt] = useState("");
  const [chatId, setChatId] = useState("") as any;

  const [messages, setMessages] = useState([]) as any;
  const [ifChatRoom, setIfChatRoom] = useState(false) as any;

  const { currentUser, setModalProps, setShowModal, setCerror } =
    useContext(LoginContext);

  let search = window.location.search;
  let params = new URLSearchParams(search);

  console.log("cccccccccccccccccccc");
  console.log("cccccccccccccccccccc");
  console.log(props.initialIdGroup);
  console.log(props.addedGroup);

  useEffect(() => {
    console.log("bbbbbbbbbbbbbbbbbb");
    console.log(props.chatId);
    if (props.chatId) {
      socket.emit("enter chatroom", { conversationId: props.chatId });
      setChatId(props.chatId);

      getMessagesInConversation(props.chatId, (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
        } else {
          setMessages(buildMessages(result.messages).reverse());
          // socket.emit("enter chatroom", { conversationId: props.chatId });
          // setChatId(props.chatId);
        }
      });
    } else {
      let addedGroupIds: string[] = [currentUser.userId];

      props.addedGroup.forEach((p: any) => {
        addedGroupIds.push(p._id);
      });

      createConversation(addedGroupIds, (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
        } else {
          socket.emit("enter chatroom", { conversationId: result });
          setIfChatRoom();
          setChatId(result);
        }
      });
    }

    socket.on("received", (data: any) => {
      console.log("received received received");

      console.log("data.newMsg");
      console.log(data.newMsg);

      console.log("props.addedGroup");
      console.log(props.addedGroup);

      setMessages((messages: any) => {
        console.log("messages");
        console.log(messages);

        return [...messages.slice(-4), ...buildMessages(data.newMsg)];
      });

      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      // props.onRemoveChatProp();
      socket.off("received");
    };
  }, []);

  useEffect(() => {
    return () => {
      console.log("chatIdddddddd");
      console.log(chatId);
      socket.emit("leaveChatroom", {
        conversationId: chatId,
      });
    };
  }, [chatId]);

  const returnChatId = () => {
    console.log("chatIdddddddd");
    console.log(chatId);

    return chatId;
  };
  function togglePortalProp() {
    setOpenPortal(false);
  }

  function buildMessages(msgArr: any) {
    let msgObjArr: any = [];
    console.log(
      "props.addedGroup props.addedGroup props.addedGroup props.addedGroup"
    );

    console.log(props.addedGroup);
    const slicedMsgArr = msgArr.slice(0, 5);
    msgArr.forEach((m: any) => {
      for (let i = 0; i < props.addedGroup.length; i++) {
        if (m.userId === props.addedGroup[i]._id) {
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

    return msgObjArr;
  }

  function getAvatars() {
    const length = props.addedGroup.length > 4 ? 4 : props.addedGroup.length;

    let selectGroup: any = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(props.addedGroup[i]);
    }

    const arr_img = selectGroup.map((g: any) => {
      return <img key={g.userId} src={g.avatar} height="50px" width="50px" />;
    });

    return arr_img;
  }

  const submitMessage = (e: any) => {
    e.preventDefault();

    if (!inputTxt) return;

    socket.emit("chat message", {
      userId: currentUser.userId,
      conversationId: chatId,
      text: inputTxt,
    });

    // props.onRemoveChatProp();

    setInputTxt("");
  };

  function addUserFilter() {
    // props.onPropStartChatProp(props.addedGroup, "group");
    history.push("/groupchat");
  }

  return (
    <>
      <div>
        <SubNav className="flex--space-between">
          {props.addedGroup.length > 1 ? (
            <div>
              <Link to="/chatPage">
                <button>Go back</button>
              </Link>
              <button onClick={addUserFilter}>Add user</button>
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
            Chatting with: {getAvatars()}
            {props.addedGroup.length > 4 && <span>...</span>}
          </p>
        </SubNav>

        <Navbar currentPath={window.location.pathname} />
        <div style={{ position: "relative" }}>
          <div>
            {messages.map((m: any) => {
              console.log("444444444444444444");
              console.log(m);

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

      <PortalModal
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
      {openPortal && <Overlay togglePortalProp={togglePortalProp} />}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    chatId: state.chatState.chatId,
    addedGroup: state.chatState.addedGroup,
    error: state.chatState.error,
    chatType: state.chatState.chatType,
    initialIdGroup: state.chatState.initialIdGroup,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPropStartChatProp: (addedGroup: any, chatType: string) =>
      dispatch(doChatUpdate(addedGroup, chatType)),
    onRemoveChatProp: () => dispatch(doChatRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
// export default Chat;
