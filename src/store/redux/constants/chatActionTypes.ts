import { IUser } from "../../../interfaces/IUser";
import IFilter from "../../../interfaces/redux";

export const API_ERROR = "API_ERROR";
export const CHAT_STATE_UPDATE = "CHAT_STATE_UPDATE";

export interface ErrorAction {
  type: typeof API_ERROR;
  error: string;
}

export interface ChatStateUpdateAction {
  type: typeof CHAT_STATE_UPDATE;
  chatPayload: any;
}

type chatAction = ErrorAction | ChatStateUpdateAction;

export type ChatActionTypes = chatAction;
