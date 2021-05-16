import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getChat, addChatMsg } from "../../utils/api/people.api";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import MsgItem from "./MsgItem";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import backButton from "./assets/back.svg";

function Chat() {
  const { chatId } = useParams() as any;
  const { currentUser, setCerror, groupChat } = useContext(LoginContext);
  const [chat, setChat] = useState(null) as any;
  const [inputTxt, setInputTxt] = useState("");
  const [messages, setMessages] = useState([]) as any;
  const history = useHistory();

  useEffect(() => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(groupChat);

    getChat(chatId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log(" getChat getChat getChat ");
        console.log(result[0]);

        setChat(result[0]);
        setMessages(result[0].messages);
      }
    });
  }, []);

  const msgSubmit = (e: any) => {
    e.preventDefault();

    const msg_obj: any = {
      authorId: currentUser.id,
      chatId: chatId,
      message: inputTxt,
    };

    addChatMsg(msg_obj, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setMessages(_.concat(messages, result));

        setInputTxt("");
      }
    });
    // props.post.onPostComment(comment_obj);
  };

  const getOtherUser = () => {
    let others = [];
    for (let i = 0; i < chat.chatters.length; i++) {
      if (chat.chatters[i].userId !== currentUser.id) {
        others.push(chat.chatters[i]);
      }
    }

    return <span>{others[0].username}</span>;
  };

  if (chat) {
    return (
      <>
        <SubNav className="flex--space-between">
          <img src={backButton} onClick={history.goBack} />
          <p>Chatting with: {getOtherUser()}</p>
        </SubNav>

        <div style={{ position: "relative" }}>
          <div>
            {messages.map((m: any) => {
              return <MsgItem key={m.id} chat={chat} msg={m} />;
            })}
          </div>

          <div>
            <form onSubmit={msgSubmit} style={{ display: "flex", bottom: "0" }}>
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
            <Navbar currentPath={window.location.pathname} />
          </div>
        </div>
      </>
    );
  } else {
    return <h2>Loading</h2>;
  }
}

export default Chat;
