import React from "react";
import { Dispatch } from "redux";
import { fetchPeople } from "../../../utils/api/people.api";
import { IUser } from "../../../interfaces/IUser";
import { API_ERROR, USERS_FETCH } from "../constants/peopleActionTypes";

const doFetchPeople = () => async (dispatch: Dispatch) => {
  fetchPeople((err: Error, result: any) => {
    console.log("sssssssssssssssssssssssss");
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      dispatch({ type: USERS_FETCH, users: result.data });
    }
  });
};

// const doPersonFeed = () => async (dispatch: Dispatch) => {
// };

export { doFetchPeople };
