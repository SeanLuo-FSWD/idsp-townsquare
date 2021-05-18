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
import { doChatRemove } from "../../store/redux/actions/chat_act";
import MsgObj from "./MsgObj";

function Chat(props: any) {
  const history = useHistory();
  const [chatId, setChatId] = useState("") as any;
  const [openPortal, setOpenPortal] = useState(false);
  const [addedPeople, setAddedPeople] = useState([]);
  const [inputTxt, setInputTxt] = useState("");
  const [socketObj, setSocketObj] = useState(null) as any;

  const [messages, setMessages] = useState([]) as any;
  const { currentUser, setModalProps, setShowModal, setCerror } =
    useContext(LoginContext);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let person_id = params.get("id");

  useEffect(() => {
    if (props.chatId) {
      getMessagesInConversation(props.chatId, (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
        } else {
          console.log("vvvvvvvvvvvvvvvvvvv");
          console.log("vvvvvvvvvvvvvvvvvvv");
          console.log(result);
          setMessages(buildMessages(result.messages));
          setAddedPeople(props.addedGroup);
        }
      });
    } else {
      // new chat
      // api save the chat, then fetch and set the chat ID.
      let addedGroupIds: string[] = [];

      props.addedGroup.forEach((p: any) => {
        console.log(p);
        addedGroupIds.push(p._id);
      });

      createConversation(addedGroupIds, (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
        } else {
          console.log("88888888888888888888");
          console.log(result);
          setChatId(result);
          setAddedPeople(props.addedGroup);
        }
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      props.onRemoveChatProp();
    };
  }, []);

  useEffect(() => {
    if (chatId) {
      socket.emit("enter chatroom", { conversationId: chatId });
    }
  }, [chatId]);

  function togglePortalProp() {
    setOpenPortal(false);
  }

  function buildMessages(msgArr: any) {
    let msgObjArr: any = [];

    msgArr.forEach((m: any) => {
      for (let i = 0; i < props.addedGroup.length; i++) {
        console.log(m);
        console.log("eeeeeeeeeeeeeeeeeeeeee");
        console.log("eeeeeeeeeeeeeeeeeeeeee");
        console.log(props.addedGroup[i]);

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

    console.log("zzzzzzzzzzzzzzzzzzzzzzz");
    console.log("zzzzzzzzzzzzzzzzzzzzzzz");
    console.log(msgObjArr);

    return msgObjArr;
  }

  function getAvatars() {
    const length = addedPeople.length > 4 ? 4 : addedPeople.length;

    let selectGroup: any = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(addedPeople[i]);
    }

    const arr_img = selectGroup.map((g: any) => {
      return <img key={g._id} src={g.avatar} height="50px" width="50px" />;
    });

    return arr_img;
  }

  const submitMessage = (e: any) => {
    e.preventDefault();

    console.log("3333333333333333");
    if (!inputTxt) return;

    console.log("444444444444444444");
    console.log(inputTxt);

    socket.emit(
      "chat message",
      {
        userId: currentUser.userId,
        conversationId: props.chatId,
        text: inputTxt,
      },
      (err: any, response: any) => {
        if (err) {
          console.log("fffffffffffffffffffffff");
          console.log(err.errMsg);

          setCerror(err.errMsg);
        } else {
          console.log("eeeeeeeeeeeeeeeeeeeeee");
          console.log(response);
        }
      }
    );

    props.onRemoveChatProp();

    setInputTxt("");
  };

  socketObj.on("received", (data: any) => {
    console.log("received data", data.messages);
    setMessages(data.messages);
  });

  return (
    <>
      <div>
        <SubNav className="flex--space-between">
          {props.chatType === "group" ? (
            <div>
              <Link to="/chatPage">
                <button>Go back</button>
              </Link>
              <Link to="/groupchat">
                <button>Add user</button>
              </Link>
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
            {addedPeople.length > 4 && <span>...</span>}
          </p>
        </SubNav>

        <Navbar currentPath={window.location.pathname} />
        <div style={{ position: "relative" }}>
          {/* <div>
            {messages.map((m: any) => {
              return <MsgItem key={m.id} chat={chat} msg={m} />;
            })}
          </div> */}

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

      <div>
        {messages.map((m: any) => {
          return <MsgItem key={m._id} msg={m} />;
        })}
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
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRemoveChatProp: () => dispatch(doChatRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
// export default Chat;
