import axios from "axios";
import { Dispatch } from "redux";
import { IPost } from "../../../interfaces/IPost";
import { fetchFeed, addComment } from "../../../utils/api/posts";
import { TComment } from "../../../interfaces/IPost";

import { FEED_FETCH, API_ERROR, COMMENT_ADD } from "../constants/actionTypes";

// const doAddPost = (post: {}) => ({
//   type: POST_ADD,
//   post,
// });

const doFetchFeed = () => async (dispatch: Dispatch) => {
  fetchFeed((err: Error, result: IPost[]) => {
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      dispatch({ type: FEED_FETCH, posts: result });
    }
  });
};

const doFetchFeedError = (error: string) => ({
  type: API_ERROR,
  error,
});

const doPostComment = (comment_obj: TComment) => async (dispatch: Dispatch) => {
  addComment(comment_obj, (err: Error, result: IPost[]) => {
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      dispatch({ type: COMMENT_ADD, comment_obj: result });
    }
  });
};

export { doFetchFeed, doFetchFeedError, doPostComment };
