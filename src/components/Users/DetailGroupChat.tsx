import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import styles2 from "./userDetail.module.scss";
import { LoginContext } from "../../store/context/LoginContext";

function DetailGroupChat({ person, onFollowHandleProp, followed }: any) {
  const { currentUser, setCerror, showModal, setShowModal } =
    useContext(LoginContext);

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

  return (
    <div key={person._id} className="flex" style={{ justifyContent: "center" }}>
      <Link to={`/person/${person._id}`}>
        <img
          className={styles2.profileImage}
          style={{ height: "100px", width: "100px" }}
          src={person.avatar}
        ></img>
      </Link>

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

export default DetailGroupChat;
