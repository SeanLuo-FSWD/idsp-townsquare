import { Dispatch } from "redux";

import {
  FEED_FILTER_UPDATE,
  API_ERROR,
  FEED_FILTER_REMOVE,
  PEOPLE_FILTER_REMOVE,
  PEOPLE_FILTER_UPDATE,
} from "../constants/filterActionTypes";

// import { fetchFeed } from "../../../utils/api/posts.api";

const doFeedFilterUpdate = (feedPgSlice: Object) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: FEED_FILTER_UPDATE, filter: feedPgSlice });
};

const doFeedFilterRemove = () => async (dispatch: Dispatch) => {
  dispatch({ type: FEED_FILTER_REMOVE });
};

const doPeopleFilterUpdate = (PeoplePgSlice: Object) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: PEOPLE_FILTER_UPDATE, filter: PeoplePgSlice });
};

const doPeopleFilterRemove = () => async (dispatch: Dispatch) => {
  dispatch({ type: PEOPLE_FILTER_REMOVE });
};

export {
  doFeedFilterUpdate,
  doFeedFilterRemove,
  doPeopleFilterUpdate,
  doPeopleFilterRemove,
};
