import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { getChatList } from "../../utils/api/people.api";
import _ from "lodash";
import { Link } from "react-router-dom";
import styles from "./ChatList.module.scss"

function ChatList() {
  const [chatList, setChatList] = useState(null) as any;

  const {
    currentUser,
    showModal,
    setShowModal,
    setCerror,
    setCurrentUser,
  } = useContext(LoginContext);

  useEffect(() => {
    getChatList(currentUser.id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setChatList(result);
      }
    });
  }, []);

  function createListItem(li: any) {
    let othersImgArr = [];
    for (let i = 0; i < li.chatters.length; i++) {
      if (li.chatters[i].userId !== currentUser.id) {
        othersImgArr.push(li.chatters[i]);
      }
    }

    // console.log(li.messages[li.messages.length - 1]);

    return (
      <div
        className={styles.chatBubbles}
        style={{
          display: "flex",
          height: "100px",
          marginTop: "20px",
          position: "relative",
        }}
      >
        <img
          className={styles.displayPicture}
          src={othersImgArr[0].img}
          style={{ width: "100px", height: "100%" }}
        />
        <div>
          <h4>{othersImgArr[0].username}</h4>
          <p>{li.messages[li.messages.length - 1].text}</p>
        </div>
        <Link
          to={`/chat/${li.id}`}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
      </div>
    );
  }

  if (chatList) {
    return (
      <div>
        {chatList.map((li: any) => {
          return <div key={li.id}>{createListItem(li)}</div>;
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
}

export default ChatList;
