import {
  FEED_FILTER_UPDATE,
  API_ERROR,
  FEED_FILTER_REMOVE,
  FilterActionTypes,
  FILTER_UPDATE,
  FILTER_REMOVE,
} from "../constants/filterActionTypes";

import _ from "lodash";

import IFilter from "../../../interfaces/redux";

// const INITIAL_STATE: IFilter | null = null;
const DEFAULT_STATE: any = {
  filt: {
    person: null,
    feed: null,
  },
  error: null,
};
const INITIAL_STATE = DEFAULT_STATE;

function filterReducer(filterState = INITIAL_STATE, action: FilterActionTypes) {
  switch (action.type) {
    case API_ERROR: {
      return { ...filterState, error: action.error };
    }
    // case FEED_FILTER_UPDATE: {
    //   const filterStore = { ...filterState, feed: action.filter };
    //   return filterStore;
    // }
    // case FEED_FILTER_REMOVE: {
    //   return { ...filterState, feed: null };
    // }
    case FILTER_UPDATE: {
      const filterStore = { ...filterState, filt: action.filter };
      return filterStore;
    }
    case FILTER_REMOVE: {
      return { ...filterState, feed: null };
    }
    default:
      return filterState;
  }
}

export default filterReducer;
