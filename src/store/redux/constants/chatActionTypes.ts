import { IUser } from "../../../interfaces/IUser";
import IFilter from "../../../interfaces/redux";

export const API_ERROR = "API_ERROR";
export const CHAT_STATE_UPDATE = "CHAT_STATE_UPDATE";
export const CHAT_STATE_REMOVE = "CHAT_STATE_REMOVE";
export const CHAT_ID_ADD = "CHAT_ID_ADD";
export const CHAT_INITIAL_ID_UPDATE = "CHAT_INITIAL_ID_UPDATE";

export interface ErrorAction {
  type: typeof API_ERROR;
  error: string;
}

export interface ChatStateUpdateAction {
  type: typeof CHAT_STATE_UPDATE;
  addedGroup: any;
  chatType: string;
  initialIdGroup: string[];
}

export interface ChatStateRemoveAction {
  type: typeof CHAT_STATE_REMOVE;
  chatPayload: any;
}

export interface ChatStateChatIdAdd {
  type: typeof CHAT_ID_ADD;
  chatId: string;
}

export interface ChatStateInitialIdGroup {
  type: typeof CHAT_INITIAL_ID_UPDATE;
  initialIdGroup: string[];
}

type chatAction =
  | ErrorAction
  | ChatStateUpdateAction
  | ChatStateRemoveAction
  | ChatStateChatIdAdd
  | ChatStateInitialIdGroup;

export type ChatActionTypes = chatAction;
