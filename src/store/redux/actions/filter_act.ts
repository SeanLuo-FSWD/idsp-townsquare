import { Dispatch } from "redux";

import {
  FEED_FILTER_UPDATE,
  API_ERROR,
  FEED_FILTER_REMOVE,
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

export { doFeedFilterUpdate, doFeedFilterRemove };
