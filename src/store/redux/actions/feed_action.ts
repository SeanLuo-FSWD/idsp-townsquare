import { Dispatch } from "redux";
import { IPost, TLikes } from "../../../interfaces/IPost";
import { fetchFeed, addComment, likePost } from "../../../utils/api/posts";
import { TComment } from "../../../interfaces/IPost";
import { v4 as uuidv4 } from "uuid";
import {
  FEED_FETCH,
  API_ERROR,
  COMMENT_ADD,
  POST_LIKE,
} from "../constants/actionTypes";
import { normalizing } from "./_payload_modifier";

// const doAddPost = (post: {}) => ({
//   type: POST_ADD,
//   post,
// });

const doFetchFeed = () => async (dispatch: Dispatch) => {
  fetchFeed((err: Error, result: IPost[]) => {
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      const normed_data = normalizing(result);
      dispatch({ type: FEED_FETCH, posts: normed_data });
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

const doLikePost = (
  userId: string,
  username: string,
  postId: string,
  liked: boolean
) => async (dispatch: Dispatch) => {
  likePost(userId, username, postId, liked, (err: Error, result: any) => {
    if (err) {
      dispatch({ type: API_ERROR, error: err.message });
    } else {
      result["id"] = uuidv4();
      dispatch({ type: POST_LIKE, post_like: result });
    }
  });
};

export { doFetchFeed, doFetchFeedError, doPostComment, doLikePost };
