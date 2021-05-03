import {
  USERS_FETCH,
  API_ERROR,
  UsersActionTypes,
} from "../constants/usersActionTypes";
import _ from "lodash";

const INITIAL_STATE = {
  users: <any[]>[],
  error: null,
};

function userReducer(usersState = INITIAL_STATE, action: UsersActionTypes) {
  switch (action.type) {
    case API_ERROR: {
      return { ...usersState, error: action.error };
    }
    case USERS_FETCH: {
      const usersStore = { ...usersState, users: action.users };

      return usersStore;
    }
    default:
      return usersState;
  }
}

export default userReducer;
