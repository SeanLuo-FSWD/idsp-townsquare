import { IUser } from "../../../interfaces/IUser";

export const API_ERROR = "API_ERROR";
export const USERS_FETCH = "USERS_FETCH";

export interface ErrorAction {
  type: typeof API_ERROR;
  error: string;
}

export interface FeedFetchAction {
  type: typeof USERS_FETCH;
  users: IUser[];
}

type UsersAction = ErrorAction | FeedFetchAction;

export type UsersActionTypes = UsersAction;
