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
import _ from "lodash";

function Chat(props: any) {
  const history = useHistory();
  // const [openPortal, setOpenPortal] = useState(false);
  const [inputTxt, setInputTxt] = useState("");
  const [chatId, setChatId] = useState("") as any;

  const [messages, setMessages] = useState([]) as any;
  const [addedGroup, setAddedGroup] = useState(props.addedGroup) as any;

  const { currentUser, setModalProps, setShowModal, setCerror } =
    useContext(LoginContext);

  let search = window.location.search;

  useEffect(() => {
    console.log("3333333333333333");
    console.log(props.initialIdGroup);
    console.log(addedGroup);

    console.log("3333333333333333");
    if (props.chatId && props.initialIdGroup.length === addedGroup.length) {
      console.log("same member same member samemember");

      setChatId(props.chatId);

      socket.emit("enter chatroom", { conversationId: props.chatId });

      getMessagesInConversation(props.chatId, (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
        } else {
          setMessages(buildMessages(result.messages).reverse());
        }
      });
    } else if (
      // Detect if new users are added
      props.initialIdGroup.length !== 0 &&
      props.initialIdGroup.length !== addedGroup.length
    ) {
      console.log(
        "addNewMemberToGroup addNewMemberToGroup addNewMemberToGroup addNewMemberToGroup"
      );

      // 1. Extract the added users Ids into an array
      let addedGroupIds = addedGroup.map((g: any) => {
        return g.userId;
      });
      let addedUsersIds: string[] = [];
      // props.initialIdGroup.forEach((id: string) => {
      //   for (let i = 0; i < addedGroup.length; i++) {
      //     if (addedGroup[i].userId !== id) {
      //       addedUsersIds.push(id);
      //     }
      //   }
      // });
      addedUsersIds = addedGroupIds.filter(
        (id: string) => !props.initialIdGroup.includes(id)
      );

      console.log("2. Emit that array along with conversation Id");
      console.log(addedUsersIds);
      console.log("2. Emit that array along with conversation Id");

      // 2. Emit that array along with conversation Id
      socket.emit("addNewMemberToGroup", {
        conversationId: props.chatId,
        newMembers: addedUsersIds,
      });
    } else {
      let addedUsersIds: string[] = [];
      for (let i = 0; i < addedGroup.length; i++) {
        addedUsersIds.push(addedGroup[i].userId);
      }

      createConversation(addedUsersIds, (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
        } else {
          socket.emit("enter chatroom", { conversationId: result });
          setChatId(result);
        }
      });
    }

    // 3. add new users to addedGroup to trigger rerender update
    // socket.on("addNewMemberToGroup", (data: any) => {
    // Johnny, can I get the "data.addedUsers" in an ARRAY of the following objects?
    // {
    //   avatar: string;
    //   username: string;
    //   userId: string;
    // }
    //   console.log("data data data data");
    //   console.log(data);
    //   setAddedGroup([...addedGroup, ...data]);
    // });

    socket.on("received", (data: any) => {
      setMessages((messages: any) => {
        return [...messages.slice(-4), ...buildMessages(data.newMsg)];
      });

      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      socket.off("received");
      // socket.off("addNewMemberToGroup");
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
    const slicedMsgArr = msgArr.slice(0, 5);
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

    return msgObjArr;
  }

  function getAvatars() {
    const length = addedGroup.length > 4 ? 4 : addedGroup.length;

    let selectGroup: any = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(addedGroup[i]);
    }

    const arr_img = selectGroup.map((g: any) => {
      console.log("selectGroup.map selectGroup.map selectGroup.map");
      console.log(g);

      // return <img key={g._id} src={g.avatar} height="50px" width="50px" />;
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

    setInputTxt("");
  };

  function addUserFilter() {
    history.push("/groupchat");
  }

  return (
    <>
      <div>
        <SubNav className="flex--space-between">
          {addedGroup.length > 1 ? (
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
            {addedGroup.length > 4 && <span>...</span>}
          </p>
        </SubNav>

        <Navbar currentPath={window.location.pathname} />
        <div style={{ position: "relative" }}>
          <div>
            {messages.map((m: any) => {
              console.log("messages.map messages.map messages.map");
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
