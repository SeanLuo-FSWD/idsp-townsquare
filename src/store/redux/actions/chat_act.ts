import { Dispatch } from "redux";

import { CHAT_STATE_UPDATE, API_ERROR } from "../constants/chatActionTypes";

// import { fetchFeed } from "../../../utils/api/posts.api";

const doChatUpdate = (chatProp: Object) => async (dispatch: Dispatch) => {
  dispatch({ type: CHAT_STATE_UPDATE, chatPayload: chatProp });
};

const doChatError = (error: string) => ({
  type: API_ERROR,
  error,
});

export { doChatUpdate, doChatError };
