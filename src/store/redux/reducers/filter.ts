import {
  FEED_FILTER_UPDATE,
  API_ERROR,
  FEED_FILTER_REMOVE,
  FilterActionTypes,
  PEOPLE_FILTER_UPDATE,
  PEOPLE_FILTER_REMOVE,
} from "../constants/filterActionTypes";

import _ from "lodash";

import IFilter from "../../../interfaces/redux";

// const INITIAL_STATE: IFilter | null = null;
const INITIAL_STATE: any = {
  feedPg: {
    applied: false,
    people: {
      age: [0, 100],
      gender: ["female", "male", "other"],
      location: ["Burnaby", "Richmond", "Coquitlam", "Vancouver", "Surrey"],
      followed: false,
    },
    feed: {
      keywords: [],
      hasImg: false,
    },
  },
  peoplePg: {
    applied: false,
    people: {
      age: [0, 100],
      gender: ["female", "male", "other"],
      location: ["Burnaby", "Richmond", "Coquitlam", "Vancouver", "Surrey"],
      followed: false,
    },
    feed: {
      keywords: [],
      hasImg: false,
    },
  },

  error: null,
};

function filterReducer(filterState = INITIAL_STATE, action: FilterActionTypes) {
  switch (action.type) {
    case API_ERROR: {
      return { ...filterState, error: action.error };
    }
    case FEED_FILTER_UPDATE: {
      console.log("FEED_FILTER_UPDATE");
      console.log(action);

      const filterStore = { ...filterState, feedPg: action.filter.feedPg };

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
