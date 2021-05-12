import { Dispatch } from "redux";
import { IPost, TLikes, TComment } from "../../../interfaces/IPost";
import {
  fetchFeed,
  createComment,
  toggleLikePost,
  postCreate,
} from "../../../utils/api/posts.api";

import {
  FEED_FETCH,
  API_ERROR,
  COMMENT_ADD,
  POST_LIKE,
  POST_CREATE,
} from "../constants/feedActionTypes";

const doPostCreate = (post_obj: any) => async (dispatch: Dispatch) => {
  // postCreate(post_obj, (err: Error, result: IPost[]) => {
  //   if (err) {
  //     dispatch({ type: API_ERROR, error: err.message });
  //   } else {
  //     dispatch({ type: POST_CREATE, post_obj_res: result });
  //   }
  // });
};

const doFetchFeed = (f_filter_obj: Object | null) => async (
  dispatch: Dispatch
) => {
  // fetchFeed(f_filter_obj, (err: Error, result: IPost[]) => {
  //   if (err) {
  //     dispatch({ type: API_ERROR, error: err.message });
  //   } else {
  //     result.reverse();
  //     dispatch({ type: FEED_FETCH, posts: result });
  //   }
  // });
};

const doFetchFeedError = (error: string) => ({
  type: API_ERROR,
  error,
});

const doPostComment = (comment_obj: TComment) => async (dispatch: Dispatch) => {
  createComment(comment_obj, (err: Error, result: IPost[]) => {
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      dispatch({ type: COMMENT_ADD, comment_obj: result });
    }
  });
};

const doLikePost = (like_obj: any) => async (dispatch: Dispatch) => {
  toggleLikePost(like_obj, (err: Error, result: any) => {
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
