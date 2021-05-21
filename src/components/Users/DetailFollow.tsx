import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";
import styles2 from "./userDetail.module.scss";
import { LoginContext } from "../../store/context/LoginContext";
import {
  doChatUpdate,
  doChatInitialChatGroup,
  doChatIdAdd,
  doChatTypeUpdate,
} from "../../store/redux/actions/chat_act";
import { connect } from "react-redux";

// function DetailFollow({ person, onFollowHandleProp, followed }: any) {

function DetailFollow({
  person,
  onFollowHandleProp,
  followed,
  onSetInitialChatGroup,
  doChatTypeUpdateProp,
}: any) {
  const { currentUser, setCerror, showModal, setShowModal } =
    useContext(LoginContext);
  const history = useHistory();

  function checkFollowed(personUserId: string) {
    const match_follow = _.filter(
      followed,
      (f: any) => f.followingUserId === personUserId
    );
    if (match_follow[0]) {
      return true;
    }
    return false;
  }

  function mapThenRedirect() {
    const personObj = {
      avatar: person.avatar,
      userId: person._id,
      username: person.username,
    };

    onSetInitialChatGroup([personObj]);
    doChatTypeUpdateProp({ new: false, group: false });
    history.push(`/chat`);
  }

  return (
    <div key={person._id} className="flex" style={{ justifyContent: "center" }}>
      <Link to={`/person/${person._id}`}>
        <img
          className={styles2.profileImage}
          style={{ height: "100px", width: "100px" }}
          src={person.avatar}
        ></img>
      </Link>

      <button onClick={() => mapThenRedirect()}>Chat</button>

      <div>
        <div>
          <h4>{person.username}</h4>
          {person._id !== currentUser.userId ? (
            checkFollowed(person._id) ? (
              <button onClick={() => onFollowHandleProp(person._id)}>
                Unfollow
              </button>
            ) : (
              <button onClick={() => onFollowHandleProp(person._id)}>
                Follow
              </button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

// export default DetailFollow;

const mapStateToProps = (state: any) => {
  return {
    chatId: state.chatState.chatId,
    addedGroup: state.chatState.addedGroup,
    error: state.chatState.error,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onPropStartChatProp: (addedGroup: any) =>
      dispatch(doChatUpdate(addedGroup)),
    onSetInitialChatGroup: (initialChatGroup: any) =>
      dispatch(doChatInitialChatGroup(initialChatGroup)),
    onSetChatIdGroup: (chatId: any) => dispatch(doChatIdAdd(chatId)),
    doChatTypeUpdateProp: (chatType: any) =>
      dispatch(doChatTypeUpdate(chatType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailFollow);
