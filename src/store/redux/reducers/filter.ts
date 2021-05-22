import {
  FEED_FILTER_UPDATE,
  API_ERROR,
  FEED_FILTER_REMOVE,
  FilterActionTypes,
  PEOPLE_FILTER_UPDATE,
  PEOPLE_FILTER_REMOVE,
} from "../constants/filterActionTypes";

import FILTER_INITIAL_STATE from "../../../constants/filter_initial_state";
import _ from "lodash";

const INITIAL_STATE: any = FILTER_INITIAL_STATE;

function filterReducer(filterState = INITIAL_STATE, action: FilterActionTypes) {
  switch (action.type) {
    case API_ERROR: {
      return { ...filterState, error: action.error };
    }
    case FEED_FILTER_UPDATE: {
      console.log("FEED_FILTER_UPDATE");
      console.log("FEED_FILTER_UPDATE");

      console.log(action.filter);

      console.log("FEED_FILTER_UPDATE");
      console.log("FEED_FILTER_UPDATE");

      const keyValArr = Object.entries(action.filter)[0];
      console.log(keyValArr);

      const filterStore = {
        ...filterState,
        [keyValArr[0]]: keyValArr[1],
      };

      return filterStore;
    }
    case FEED_FILTER_REMOVE: {
      return { ...filterState, feedPg: INITIAL_STATE.feedPg };
    }
    case PEOPLE_FILTER_UPDATE: {
      console.log("PEOPLE_FILTER_UPDATE");
      console.log(action);

      const filterStore = { ...filterState, peoplePg: action.filter.peoplePg };

      return filterStore;
    }
    case PEOPLE_FILTER_REMOVE: {
      console.log("PEOPLE_FILTER_REMOVE");

      return { ...filterState, peoplePg: INITIAL_STATE.peoplePg };
    }
    default:
      return filterState;
  }
}

export default filterReducer;
