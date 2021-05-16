import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";
import PortalModal from "../../UI/PortalModal";
import Overlay from "../../UI/Overlay";

function GroupChat({
  addedGroupIds,
  addedGroup,
  initChatId,
  setToggleViewProp,
}: any) {
  const history = useHistory();
  const [chatId, setChatId] = useState(initChatId) as any;
  const [openPortal, setOpenPortal] = useState(false);

  const [messages, setMessages] = useState([]) as any;

  function togglePortalProp() {
    setOpenPortal(false);
  }

  function getAvatars() {
    const length = addedGroup.length > 4 ? 4 : addedGroup.length;

    let selectGroup = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(addedGroup[i]);
    }

    const arr_img = selectGroup.map((g: any) => {
      return <img key={g._id} src={g.avatar} height="50px" width="50px" />;
    });

    return arr_img;
  }

  return (
    <>
      <div>
        <SubNav className="flex--space-between">
          {!chatId ? (
            <button onClick={() => setOpenPortal(true)}>To Chat List</button>
          ) : (
            <button onClick={() => history.push("/chatPage")}>
              To Chat List
            </button>
          )}

          <button onClick={() => setToggleViewProp("")}>Add user</button>

          <p>
            Chatting with: {getAvatars()}
            {addedGroup.length > 4 && <span>...</span>}
          </p>
        </SubNav>

        <Navbar currentPath={window.location.pathname} />
      </div>

      <PortalModal
        message="Are you sure to leave? This empty chat won't be saved."
        isOpen={openPortal}
        onClose={() => setOpenPortal(false)}
      >
        <button onClick={history.goBack}>Leave</button>
      </PortalModal>
      {openPortal && <Overlay togglePortalProp={togglePortalProp} />}
    </>
  );
}

export default GroupChat;
