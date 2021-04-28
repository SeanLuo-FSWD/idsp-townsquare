import {
  FEED_FETCH,
  FEED_FETCH_ERROR,
  FeedActionTypes,
} from "../constants/actionTypes";
import { fetchFeed } from "../../../utils/api/posts";
import { IPost } from "../../../interfaces/IPost";

const INITIAL_STATE = {
  posts: [],
  error: null,
};

function feedReducer(state = INITIAL_STATE, action: FeedActionTypes) {
  switch (action.type) {
    case FEED_FETCH: {
      console.log("FEED_FETCH");
      console.log(action.posts);

      return { ...state, posts: action.posts };
    }
    case FEED_FETCH_ERROR: {
      console.log("FEED_FETCH_ERROR");
      console.log(action.error);

      return { ...state, error: action.error };
    }

    default:
      return state;
  }
}

export default feedReducer;
