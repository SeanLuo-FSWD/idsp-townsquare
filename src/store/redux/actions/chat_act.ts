import { Dispatch } from "redux";

import {
  CHAT_STATE_UPDATE,
  API_ERROR,
  CHAT_STATE_REMOVE,
  CHAT_ID_ADD,
  CHAT_INITIAL_ID_UPDATE,
} from "../constants/chatActionTypes";

// import { fetchFeed } from "../../../utils/api/posts.api";

const doChatUpdate =
  (addedGroup: Object, chatType: string) => async (dispatch: Dispatch) => {
    console.log("2222222222222222");
    console.log("chatProp");
    console.log(addedGroup);
    dispatch({
      type: CHAT_STATE_UPDATE,
      addedGroup: addedGroup,
      chatType: chatType,
    });
  };

const doChatInitialIdGroup =
  (initialIdGroup: string[]) => async (dispatch: Dispatch) => {
    dispatch({
      type: CHAT_INITIAL_ID_UPDATE,
      initialIdGroup: initialIdGroup,
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
  console.log("2222222222222222");
  console.log("chatId");
  console.log(chatId);

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
  doChatInitialIdGroup,
};
