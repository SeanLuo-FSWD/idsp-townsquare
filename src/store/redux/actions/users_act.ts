import React from "react";
import { Dispatch } from "redux";
import { fetchUsers } from "../../../utils/api/users.api";
import { IUser } from "../../../interfaces/IUser";
import { API_ERROR, USERS_FETCH } from "../constants/usersActionTypes";

const doFetchUsers = () => async (dispatch: Dispatch) => {
  fetchUsers((err: Error, result: any) => {
    console.log("sssssssssssssssssssssssss");
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      dispatch({ type: USERS_FETCH, users: result.data });
    }
  });
};

export { doFetchUsers };
