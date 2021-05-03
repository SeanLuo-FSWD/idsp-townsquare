import React from "react";
import { IUser } from "../../../interfaces/IUser";

const getUser = (usersState: any, id: string | number) => {
  for (let i = 0; i < usersState.users.length; i++) {
    if (usersState.users[i].id == id) {
      console.log("ddddddddddddddddddddddd");
      console.log(usersState.users[i]);
      return usersState.users[i];
    }
  }

  return;
};

const getUserFeed = (usersState: IUser[]) => {
  return usersState;
};

export { getUser, getUserFeed };
