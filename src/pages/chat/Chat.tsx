import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getChat, addChatMsg } from "../../utils/api/people.api";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import MsgItem from "./MsgItem";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";

function Chat() {
  const { chatId } = useParams() as any;
  const { currentUser, setCerror, setCurrentUser } = useContext(LoginContext);
  const [chat, setChat] = useState(null) as any;
  const [inputTxt, setInputTxt] = useState("");
  const [messages, setMessages] = useState([]) as any;
  const history = useHistory();

  useEffect(() => {
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
        console.log("88888888888888888888");
        console.log("88888888888888888888");
        console.log(result);

        setMessages(_.concat(messages, result));

        setInputTxt("");
      }
    });
    // props.post.onPostComment(comment_obj);
  };

  const getOtherUser = () => {
    let others = [];

    console.log("2222222222222222");
    console.log("2222222222222222");
    console.log(chat);

    for (let i = 0; i < chat.chatters.length; i++) {
      if (chat.chatters[i].userId !== currentUser.id) {
        others.push(chat.chatters[i]);
      }
    }

    return <span>{others[0].username}</span>;
  };

  if (chat) {
    console.log("777777777777777777777");
    console.log("777777777777777777777");
    console.log(messages);

    return (
      <>
        <SubNav className="flex--space-between">
          <button onClick={history.goBack}>Back</button>
          <h2>Chatting with: {getOtherUser()}</h2>
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
              <button type="submit">add Comment</button>
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
