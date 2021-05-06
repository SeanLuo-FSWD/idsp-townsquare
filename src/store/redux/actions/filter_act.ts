import { Dispatch } from "redux";

import { FEED_FILTER_FETCH, API_ERROR } from "../constants/filterActionTypes";

import { fetchFeed } from "../../../utils/api/posts.api";

const doFeedFilterSubmit = (f_filter: Object) => async (dispatch: Dispatch) => {
  fetchFeed(f_filter, (err: Error, result: any) => {
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      dispatch({ type: FEED_FILTER_FETCH, feed: result });
    }
  });
};

export { doFeedFilterSubmit };
