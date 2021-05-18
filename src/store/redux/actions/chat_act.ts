import { Dispatch } from "redux";

import {
  CHAT_STATE_UPDATE,
  API_ERROR,
  CHAT_STATE_REMOVE,
  CHAT_ID_ADD,
} from "../constants/chatActionTypes";

// import { fetchFeed } from "../../../utils/api/posts.api";

const doChatUpdate =
  (chatProp: Object, chatType: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: CHAT_STATE_UPDATE,
      chatPayload: chatProp,
      chatType: chatType,
    });
  };

const doChatRemove = () => async (dispatch: Dispatch) => {
  dispatch({ type: CHAT_STATE_REMOVE });
};

const doChatError = (error: string) => ({
  type: API_ERROR,
  error,
});

const doChatIdAdd = (chatId: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: CHAT_ID_ADD,
    chatId: chatId,
  });
};

export { doChatUpdate, doChatError, doChatRemove, doChatIdAdd };
