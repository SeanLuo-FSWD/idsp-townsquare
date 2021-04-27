import axios from "axios";
import { Dispatch } from "redux";
import IPost from "../../../interfaces/IPost";
import fetchFeed from "../../../utils/api/posts";

import {
  FEED_FETCH,
  FEED_FETCH_ERROR,
  FeedActionTypes,
} from "../constants/actionTypes";

// const doAddPost = (post: {}) => ({
//   type: POST_ADD,
//   post,
// });

const doFetchFeed = () => async (dispatch: Dispatch) => {
  fetchFeed((err: Error, result: IPost[]) => {
    if (err) {
      dispatch({ type: FEED_FETCH_ERROR, error: err.message });
    } else {
      dispatch({ type: FEED_FETCH, posts: result });
    }
  });
};

const doFetchFeedError = (error: string) => ({
  type: FEED_FETCH_ERROR,
  error,
});

export { doFetchFeed, doFetchFeedError };
