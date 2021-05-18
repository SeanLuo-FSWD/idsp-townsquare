import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { doChatUpdate, doChatIdAdd } from "../../store/redux/actions/chat_act";
import { useHistory, useParams } from "react-router-dom";

function ChatListItem(props: any) {
  const [addedGroup, setAddedGroup] = useState([]) as any; // array of ids
  const history = useHistory();

  useEffect(() => {
    setAddedGroup(props.convo.members);
  }, []);

  function getAvatars() {
    const length =
      props.convo.members.length > 4 ? 4 : props.convo.members.length;

    let selectGroup: any = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(props.convo.members[i]);
    }

    const arr_img = selectGroup.map((g: any) => {
      return <img key={g._id} src={g.avatar} height="50px" width="50px" />;
    });

    return arr_img;
  }

  function mapThenRedirect() {
    console.log("3333333333333333");
    const chatType = props.convo.members.length > 2 ? "group" : "private";

    props.onPropStartChatProp(props.convo.members, chatType);
    props.onAddChatIdProp(props.convo.conversationId);

    history.push("/chat");
  }

  return (
    <>
      <div onClick={mapThenRedirect}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{getAvatars()}</div>
          <div>
            <p>{props.convo.messages[0].text}</p>
          </div>
        </div>
      </div>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddChatIdProp: (chatId: string) => dispatch(doChatIdAdd(chatId)),
    onPropStartChatProp: (addedGroup: any, chatType: string) =>
      dispatch(doChatUpdate(addedGroup, chatType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListItem);
