import { Dispatch } from "redux";

import {
  FEED_FILTER_UPDATE,
  API_ERROR,
  FEED_FILTER_REMOVE,
  FILTER_UPDATE,
  FILTER_REMOVE,
} from "../constants/filterActionTypes";

// import { fetchFeed } from "../../../utils/api/posts.api";

const doFeedFilterUpdate = (f_filter: Object) => async (dispatch: Dispatch) => {
  dispatch({ type: FEED_FILTER_UPDATE, filter: f_filter });
};

const doFeedFilterRemove = () => async (dispatch: Dispatch) => {
  dispatch({ type: FEED_FILTER_REMOVE });
};

const doFilterUpdate = (filter_obj: Object) => async (dispatch: Dispatch) => {
  dispatch({ type: FILTER_UPDATE, filter: filter_obj });
};

const doFilterRemove = () => async (dispatch: Dispatch) => {
  dispatch({ type: FILTER_REMOVE });
};
export {
  doFeedFilterUpdate,
  doFeedFilterRemove,
  doFilterUpdate,
  doFilterRemove,
};
