import { Dispatch } from "redux";

import {
  CHAT_STATE_UPDATE,
  API_ERROR,
  CHAT_STATE_REMOVE,
  CHAT_ID_ADD,
  CHAT_INITIAL_CHAT_UPDATE,
  CHAT_TYPE_UPDATE,
} from "../constants/chatActionTypes";

// import { fetchFeed } from "../../../utils/api/posts.api";

const doChatUpdate = (addedGroup: Object) => async (dispatch: Dispatch) => {
  dispatch({
    type: CHAT_STATE_UPDATE,
    addedGroup: addedGroup,
  });
};

const doChatTypeUpdate = (chatType: Object) => async (dispatch: Dispatch) => {
  dispatch({
    type: CHAT_TYPE_UPDATE,
    chatType: chatType,
  });
};

const doChatInitialChatGroup =
  (initialChatGroup: string[]) => async (dispatch: Dispatch) => {
    dispatch({
      type: CHAT_INITIAL_CHAT_UPDATE,
      initialChatGroup: initialChatGroup,
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

export {
  doChatUpdate,
  doChatError,
  doChatRemove,
  doChatIdAdd,
  doChatInitialChatGroup,
  doChatTypeUpdate,
};
