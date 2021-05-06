import { IUser } from "../../../interfaces/IUser";
import IFilter from "../../../interfaces/redux";

export const API_ERROR = "API_ERROR";
export const FEED_FILTER_UPDATE = "FEED_FILTER_UPDATE";
export const FEED_FILTER_REMOVE = "FEED_FILTER_REMOVE";
export interface ErrorAction {
  type: typeof API_ERROR;
  error: string;
}

export interface FilterFetchAction {
  type: typeof FEED_FILTER_UPDATE;
  filter: IFilter;
}

export interface filterRemoveAction {
  type: typeof FEED_FILTER_REMOVE;
}

type FilterAction = ErrorAction | FilterFetchAction | filterRemoveAction;

export type FilterActionTypes = FilterAction;
