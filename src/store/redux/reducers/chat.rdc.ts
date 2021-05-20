import {
  CHAT_STATE_UPDATE,
  API_ERROR,
  ChatActionTypes,
  CHAT_STATE_REMOVE,
  CHAT_ID_ADD,
  CHAT_INITIAL_CHAT_UPDATE,
  CHAT_TYPE_UPDATE,
} from "../constants/chatActionTypes";

import _ from "lodash";

import IAddedGroup from "../../../interfaces/redux";

const INITIAL_STATE: {
  error: null | string;
  chatId: string;
  addedGroup: IAddedGroup[];
  initialChatGroup: IAddedGroup[];
  chatType: {
    new: boolean;
    group: boolean;
  };
} = {
  error: null,
  chatId: "",
  addedGroup: [],
  chatType: {
    new: true,
    group: false,
  },
  initialChatGroup: [],
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
        addedGroup: action.addedGroup,
      };
      // change state here
      return newChatState;
    }
    case CHAT_TYPE_UPDATE: {
      console.log("CHAT_TYPE_UPDATE");
      const newChatState = {
        ...chatState,
        chatType: action.chatType,
      };
      // change state here
      return newChatState;
    }
    case CHAT_INITIAL_CHAT_UPDATE: {
      console.log("CHAT_INITIAL_CHAT_UPDATE");
      const newChatState = {
        ...chatState,
        initialChatGroup: action.initialChatGroup,
      };
      // change state here
      return newChatState;
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
