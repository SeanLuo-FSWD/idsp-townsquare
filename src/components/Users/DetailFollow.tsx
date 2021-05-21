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
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import addToGroupIcon from "./assets/addToGroup.svg";
import unfollowIcon from "./assets/unfollow.svg";
import followIcon from "./assets/follow.svg";
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
    <div className={styles2.detailedCards}>
      <div className={styles2.cardWrapper}>
        <div
          key={person._id}
          className="flex"
          style={{ justifyContent: "center" }}
        >
          <div className={styles2.vertialAlign}>
            <div className={styles2.avatarAndInfoWrapper}>
              <div className={styles2.avatarAndButtons}>
                <Link to={`/person/${person._id}`}>
                  <img
                    className={styles2.profileImage}
                    style={{ height: "100px", width: "100px" }}
                    src={person.avatar}
                  ></img>
                </Link>
              </div>

              <div className={styles2.userDescription}>
                <div>{person.username}</div>

                <div>
                  <span style={{ marginRight: "5px" }}>Location</span>
                  <span>{person.location}</span>
                </div>

                <div>
                  <span style={{ marginRight: "5px" }}>Age</span>
                  <span>{person.age}</span>
                </div>

                <div>
                  <span style={{ marginRight: "5px" }}>Gender</span>
                  <span>{person.gender}</span>
                </div>
              </div>
            </div>
            <div className={styles2.followUnfollowButtons}>
              {person._id !== currentUser.userId ? (
                checkFollowed(person._id) ? (
                  <button
                    className={styles2.detailedButtons}
                    onClick={() => onFollowHandleProp(person._id)}
                  >
                    Unfollow
                    <img className={styles2.buttonIcons} src={unfollowIcon} />
                  </button>
                ) : (
                  <button
                    className={styles2.detailedButtons}
                    onClick={() => onFollowHandleProp(person._id)}
                  >
                    Follow
                    <img className={styles2.buttonIcons} src={followIcon} />
                  </button>
                )
              ) : null}
              {person._id !== currentUser.userId && (
                <button
                  className={styles2.detailedButtons}
                  onClick={() => mapThenRedirect()}
                >
                  Chat
                  <img className={styles2.buttonIcons} src={addToGroupIcon} />
                </button>
              )}
            </div>
          </div>
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
