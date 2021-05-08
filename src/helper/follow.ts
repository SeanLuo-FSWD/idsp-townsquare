import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../store/context/LoginContext";
import { userFollow } from "../utils/api/people.api";
import _ from "lodash";

const useOnFollowHandle = (follow_obj: any) => {
  const {
    currentUser,
    showModal,
    setShowModal,
    setCerror,
    setCurrentUser,
  } = useContext(LoginContext);

  if (!follow_obj) {
    return null;
  }

  let updatedUser;

  userFollow(
    follow_obj.userId,
    follow_obj.follow,
    (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
        return;
      } else {
        let newFollowArr = [];
        if (!follow_obj.follow) {
          console.log("unfollow unfollow");
          console.log(follow_obj.follow);

          newFollowArr = _.filter(
            currentUser.followed,
            (f) => f !== follow_obj.userId
          );
          console.log(newFollowArr);
        } else {
          console.log("follow follow");
          console.log(follow_obj.follow);
          newFollowArr = [...currentUser.followed, follow_obj.userId];
          console.log(newFollowArr);
        }

        const newUser = { ...currentUser, followed: newFollowArr };

        console.log("-------------");
        console.log(newFollowArr);
        console.log(currentUser);
        console.log(newUser);
        console.log("-------------");
        updatedUser = newUser;
      }
    }
  );

  return updatedUser;
};

export { useOnFollowHandle };
