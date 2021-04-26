import axios from "axios";
import { Dispatch } from "redux";
import fetchFeed from "../../api/posts";

import {
  FEED_FETCH,
  POST_ADD,
  FEED_FETCH_ERROR,
} from "../constants/actionTypes";

const doAddPost = (post: {}) => ({
  type: POST_ADD,
  post,
});

const doFetchFeed = () => async (dispatch: Dispatch) => {
  const posts = fetchFeed();
  dispatch({ type: "FEED_FETCH", payload: posts });
};

const doFetchFeedError = (error: string) => ({
  type: FEED_FETCH_ERROR,
  error,
});

export { doAddPost, doFetchFeed, doFetchFeedError };
