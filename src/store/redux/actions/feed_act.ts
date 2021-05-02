import { Dispatch } from "redux";
import { IPost, TLikes } from "../../../interfaces/IPost";
import {
  fetchFeed,
  addComment,
  likePost,
  postCreate,
} from "../../../utils/api/posts.api";
import { TComment } from "../../../interfaces/IPost";

import {
  FEED_FETCH,
  API_ERROR,
  COMMENT_ADD,
  POST_LIKE,
  POST_CREATE,
} from "../constants/actionTypes";

const doPostCreate = (post_obj: any) => async (dispatch: Dispatch) => {
  postCreate(post_obj, (err: Error, result: IPost[]) => {
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      dispatch({ type: POST_CREATE, post_obj_res: result });
    }
  });
};

const doFetchFeed = () => async (dispatch: Dispatch) => {
  fetchFeed((err: Error, result: IPost[]) => {
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      result.reverse();
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

const doLikePost = (like_obj: any) => async (dispatch: Dispatch) => {
  likePost(like_obj, (err: Error, result: any) => {
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      dispatch({ type: POST_LIKE, post_like: result });
    }
  });
};

export {
  doFetchFeed,
  doFetchFeedError,
  doPostComment,
  doLikePost,
  doPostCreate,
};
