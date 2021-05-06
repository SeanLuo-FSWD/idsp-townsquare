import { IUser } from "../../../interfaces/IUser";

export const API_ERROR = "API_ERROR";
export const FEED_FILTER_FETCH = "FEED_FILTER_FETCH";

export interface ErrorAction {
  type: typeof API_ERROR;
  error: string;
}

export interface FilterFetchAction {
  type: typeof FEED_FILTER_FETCH;
  filter: {
    userFilter: {};
    postFilter: {};
  };
}

type FilterAction = ErrorAction | FilterFetchAction;

export type FilterActionTypes = FilterAction;
