import React from "react";
import { Dispatch } from "redux";
import { getPeople } from "../../../utils/api/people.api";
import { IUser } from "../../../interfaces/IUser";
import { API_ERROR, USERS_FETCH } from "../constants/peopleActionTypes";

const dogetPeople = (peoplePg: any) => async (dispatch: Dispatch) => {
  // getPeople(peoplePg, (err: Error, result: any) => {
  //   if (err) {
  //     dispatch({ type: API_ERROR, error: err.message });
  //   } else {
  //     dispatch({ type: USERS_FETCH, users: result.data });
  //   }
  // });
};

// const doPersonFeed = () => async (dispatch: Dispatch) => {
// };

export { dogetPeople };
