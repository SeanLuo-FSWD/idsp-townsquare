import { FEED_FETCH, FEED_FETCH_ERROR } from "../constants/actionTypes";
import fetchFeed from "../../api/posts";
import IPost from "../../interfaces/IPost";

const INITIAL_STATE = {
  posts: [],
  error: null,
};

interface FeedFetchAction {
  type: typeof FEED_FETCH;
  payload: any;
}

function feedReducer(state = INITIAL_STATE, action: FeedFetchAction) {
  switch (action.type) {
    case FEED_FETCH: {
      return { ...state, posts: action.payload.data };
    }

    default:
      return state;
  }
}

export default feedReducer;
