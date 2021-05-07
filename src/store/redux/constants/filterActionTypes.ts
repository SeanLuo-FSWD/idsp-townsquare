import { IUser } from "../../../interfaces/IUser";
import IFilter from "../../../interfaces/redux";

export const API_ERROR = "API_ERROR";
export const FEED_FILTER_UPDATE = "FEED_FILTER_UPDATE";
export const FEED_FILTER_REMOVE = "FEED_FILTER_REMOVE";
export const PEOPLE_FILTER_UPDATE = "PEOPLE_FILTER_UPDATE";
export const PEOPLE_FILTER_REMOVE = "PEOPLE_FILTER_REMOVE";

export interface ErrorAction {
  type: typeof API_ERROR;
  error: string;
}

export interface FeedFilterUpdateAction {
  type: typeof FEED_FILTER_UPDATE;
  filter: any;
}

export interface FeedFilterRemoveAction {
  type: typeof FEED_FILTER_REMOVE;
}

export interface PeopleFilterUpdateAction {
  type: typeof PEOPLE_FILTER_UPDATE;
  filter: any;
}

export interface PeopleFilterRemoveAction {
  type: typeof PEOPLE_FILTER_REMOVE;
}

type FilterAction =
  | ErrorAction
  | FeedFilterUpdateAction
  | FeedFilterRemoveAction
  | PeopleFilterUpdateAction
  | PeopleFilterRemoveAction;

export type FilterActionTypes = FilterAction;
