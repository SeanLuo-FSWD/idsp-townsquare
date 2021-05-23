import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import {
  getPerson,
  getFollowingUsers,
  toggleFollowing,
} from "../../utils/api/people.api";
import socket from "../../utils/socketIO.util";

import DetailFollow from "../../components/Users/DetailFollow";

function UserDetail(props: any) {
  console.log("UserDetail UserDetail UserDetail: user");
  console.log(props.people);
  const { currentUser, setCerror, showModal, setShowModal } =
    useContext(LoginContext);

  const [groupDd, setGroupDd] = useState(false) as any;
  const [group, setGroup] = useState([]) as any;

  const [followed, setFollowed] = useState([]) as any;

  useEffect(() => {
    getFollowingUsers((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setFollowed(result.data);
      }
    });
  }, []);

  const onFollowHandleProp = (followUserId: string) => {
    toggleFollowing(followUserId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        if (result.follow_status === "followed") {
          console.log("UserDetail.tsx - followed : result");

          setFollowed([
            ...followed,
            { followingUserId: followUserId, userId: currentUser.userId },
          ]);

          const notification_obj = result.notification_result;

          if (notification_obj) {
            socket.emit("notification", notification_obj);
          }
        } else {
          const new_follow_arr = _.filter(
            followed,
            (f: any) => f.followingUserId !== followUserId
          );

          setFollowed(new_follow_arr);
        }
      }
    });
  };

  // const initGroups = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"];

  return (
    <div>
      {props.people.map((person: any) => {
        return (
          <div key={person._id}>
            <DetailFollow
              person={person}
              onFollowHandleProp={onFollowHandleProp}
              followed={followed}
            />
          </div>
        );
      })}
    </div>
  );
}

export default UserDetail;
