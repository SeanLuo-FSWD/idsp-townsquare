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
  const [addedPeople, setAddedPeople] = useState(addedGroup);

  const [messages, setMessages] = useState([]) as any;

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let person_id = params.get("id");

  console.log("999999999999999999999");
  console.log("000000000000000000000");
  console.log(addedGroup);

  function togglePortalProp() {
    setOpenPortal(false);
  }

  function getAvatars() {
    const length = addedPeople.length > 4 ? 4 : addedPeople.length;

    let selectGroup = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(addedPeople[i]);
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

          <button onClick={() => setToggleViewProp("")}>Add user</button>

          <p>
            Chatting with: {getAvatars()}
            {addedPeople.length > 4 && <span>...</span>}
          </p>
        </SubNav>

        <Navbar currentPath={window.location.pathname} />
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

export default GroupChat;
