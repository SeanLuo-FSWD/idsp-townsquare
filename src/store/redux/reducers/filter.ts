import {
  FEED_FILTER_UPDATE,
  API_ERROR,
  FEED_FILTER_REMOVE,
  FilterActionTypes,
} from "../constants/filterActionTypes";

import _ from "lodash";

import IFilter from "../../../interfaces/redux";

// const INITIAL_STATE: IFilter | null = null;
const DEFAULT_STATE: any = {
  person: null,
  feed: null,
  error: null,
};
const INITIAL_STATE = DEFAULT_STATE;

function filterReducer(filterState = INITIAL_STATE, action: FilterActionTypes) {
  switch (action.type) {
    case API_ERROR: {
      return { ...filterState, error: action.error };
    }
    case FEED_FILTER_UPDATE: {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
      console.log("FEED_FILTER_UPDATE");
      console.log(action);

      const filterStore = { ...filterState, feed: action.filter };
      return filterStore;
    }
    case FEED_FILTER_REMOVE: {
      console.log("sssssssssssssssssssssssss");
      console.log("FEED_FILTER_REMOVE");

      return { ...filterState, feed: null };
    }
    default:
      return filterState;
  }
}

export default filterReducer;
