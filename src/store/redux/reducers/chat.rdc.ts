import {
  CHAT_STATE_UPDATE,
  API_ERROR,
  ChatActionTypes,
  CHAT_STATE_REMOVE,
  CHAT_ID_ADD,
} from "../constants/chatActionTypes";

import _ from "lodash";

import IAddedGroup from "../../../interfaces/redux";

const INITIAL_STATE: {
  error: null | string;
  chatId: string;
  addedGroup: IAddedGroup[];
  chatType: string;
} = {
  error: null,
  chatId: "",
  addedGroup: [],
  chatType: "",
};

function chatReducer(chatState = INITIAL_STATE, action: ChatActionTypes) {
  switch (action.type) {
    case API_ERROR: {
      return { ...chatState, error: action.error };
    }
    case CHAT_STATE_UPDATE: {
      console.log("CHAT_STATE_UPDATE");
      const newChatState = {
        ...chatState,
        addedGroup: action.chatPayload,
        chatType: action.chatType,
      };
      // change state here
      return newChatState;
    }
    case CHAT_STATE_REMOVE: {
      console.log("CHAT_STATE_REMOVE");
      return INITIAL_STATE;
    }

    case CHAT_STATE_REMOVE: {
      console.log("CHAT_STATE_REMOVE");
      return INITIAL_STATE;
    }

    case CHAT_ID_ADD: {
      console.log("CHAT_ID_ADD");
      const newChatState = {
        ...chatState,
        chatId: action.chatId,
      };
      return newChatState;
    }
    default:
      return chatState;
  }
}

export default chatReducer;
