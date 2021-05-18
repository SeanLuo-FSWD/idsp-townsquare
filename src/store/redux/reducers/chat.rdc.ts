import {
  CHAT_STATE_UPDATE,
  API_ERROR,
  ChatActionTypes,
} from "../constants/chatActionTypes";

import _ from "lodash";

import IAddedGroup from "../../../interfaces/redux";

const INITIAL_STATE: {
  error: null | string;
  chatId: string;
  addedGroup: IAddedGroup[];
} = {
  error: null,
  chatId: "",
  addedGroup: [],
};

function chatReducer(chatState = INITIAL_STATE, action: ChatActionTypes) {
  switch (action.type) {
    case API_ERROR: {
      return { ...chatState, error: action.error };
    }
    case CHAT_STATE_UPDATE: {
      console.log("CHAT_STATE_UPDATE");
      console.log("CHAT_STATE_UPDATE");

      console.log(action.chatPayload);
      const newChatState = { ...chatState, addedGroup: action.chatPayload };
      // change state here
      return newChatState;
    }
    default:
      return chatState;
  }
}

export default chatReducer;
