import {
  FEED_FETCH,
  API_ERROR,
  FeedActionTypes,
  COMMENT_ADD,
} from "../constants/actionTypes";
import { fetchFeed } from "../../../utils/api/posts";
import { IPost } from "../../../interfaces/IPost";

const INITIAL_STATE = {
  posts: <any[]>[],
  error: null,
};

function feedReducer(feedState = INITIAL_STATE, action: FeedActionTypes) {
  switch (action.type) {
    case FEED_FETCH: {
      console.log("FEED_FETCH");
      console.log(action.posts);

      return { ...feedState, posts: action.posts };
    }
    case API_ERROR: {
      console.log("API_ERROR");
      console.log(action.error);

      return { ...feedState, error: action.error };
    }

    case COMMENT_ADD: {
      const new_state_post = feedState.posts.map((post) => {
        if (post.postId == action.comment_obj.postId) {
          const new_commentList = [...post.commentList, action.comment_obj];

          return { ...post, commentList: new_commentList };
        } else {
          return post;
        }
      });

      return { ...feedState, posts: new_state_post };
    }

    default:
      return feedState;
  }
}

export default feedReducer;
