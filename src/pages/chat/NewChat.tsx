import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";

function NewChat({ addedGroupIds, addedGroup }: any) {
  const history = useHistory();

  const [messages, setMessages] = useState([]) as any;

  console.log("777777777777777777777");
  console.log("777777777777777777777");
  console.log(addedGroup);

  function getAvatars() {
    let img_arr = [];
    let arr_img = [];

    if (addedGroup.length > 5) {
      for (let i = 0; i < 5; i++) {
        img_arr.push(addedGroup[i].avatar);
      }

      arr_img = img_arr.map((url) => {
        return <img src={url} height="50px" width="50px" />;
      });

      return arr_img;
    } else {
      for (let i = 0; i < addedGroup.length; i++) {
        img_arr.push(addedGroup[i].avatar);
      }

      arr_img = img_arr.map((url) => {
        return <img src={url} height="50px" width="50px" />;
      });

      return arr_img;
    }
  }

  function backToChatList() {}

  return (
    <div>
      <SubNav className="flex--space-between">
        <button onClick={history.goBack}>Go Back</button>
        <p>
          Chatting with: {getAvatars()}{" "}
          {addedGroup.length > 5 && <span>...</span>}
        </p>
      </SubNav>

      <Navbar currentPath={window.location.pathname} />
    </div>
  );
}

export default NewChat;
