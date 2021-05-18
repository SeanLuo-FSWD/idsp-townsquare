import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";
import PortalModal from "../../UI/PortalModal";
import Overlay from "../../UI/Overlay";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createConversation } from "../../utils/api/realtime.api";
import { LoginContext } from "../../store/context/LoginContext";
// import socket from "../../utils/socketIO.util";
import MsgItem from "./MsgItem";
import socketIO from "socket.io-client";

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

  const socket = socketIO("http://localhost:8000", {
    withCredentials: true,
    autoConnect: false,
    transports: ["websocket"],
    // timeout: 10000,
  });

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let person_id = params.get("id");

  // useEffect(() => {
  //   console.log(" ----- useEffect in App.tsx ------- ");
  //   console.log(currentUser);
  //   console.log("--- connect socket in APP ---");
  //   socket.connect();
  //   console.log(socket);

  //   return () => {
  //     console.log("--- socket disconnected");
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    if (chatId) {
      //fetch here. Before setting people.
    } else {
      // new chat

      if (props.addedGroup.length > 1) {
        // Group chat
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
      } else {
        // Private chat
        // set users, save chat ONLY when msg sent
        setAddedPeople(props.addedGroup);
      }
    }
  }, []);

  useEffect(() => {
    socket.on("received", (message) => {
      console.log("xxxxxxxxxxxxxxxxxxxxxx");
      console.log(message);
    });
  }, []);

  useEffect(() => {
    socket.emit("enter chatroom", { conversationId: chatId });
  }, [chatId]);

  function togglePortalProp() {
    setOpenPortal(false);
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

    socket.emit("chat message", {
      userId: currentUser.userId,
      conversationId: chatId,
      text: inputTxt,
    });

    setInputTxt("");
  };

  // socketObj.on("received", (data: any) => {
  //   console.log("received data", data.messages);
  //   setMessages(data.messages);
  // });

  return (
    <>
      <div>
        <SubNav className="flex--space-between">
          {!chatId ? (
            <button onClick={() => setOpenPortal(true)}>Back</button>
          ) : (
            <button
              onClick={() => {
                document.body.classList.remove("disable_scroll");
                history.goBack();
              }}
            >
              {/* <button onClick={() => history.push("/chatPage")}> */}
              Back
            </button>
          )}

          {/* <button onClick={() => setToggleViewProp("")}>Add user</button> */}

          <Link to="/groupchat">
            <button>Add user</button>
          </Link>
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
  };
};

export default connect(mapStateToProps)(Chat);
// export default Chat;
