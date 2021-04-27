import { FEED_FETCH, FEED_FETCH_ERROR } from "../constants/actionTypes";
import fetchFeed from "../../../utils/api/posts";
import IPost from "../../../interfaces/IPost";

const INITIAL_STATE = {
  posts: [],
  error: null,
};

interface FeedFetchAction {
  type: typeof FEED_FETCH | typeof FEED_FETCH_ERROR;
  payload: any;
}

function feedReducer(state = INITIAL_STATE, action: FeedFetchAction) {
  console.log("feedReducer called");
  console.log(action.payload);

  switch (action.type) {
    case FEED_FETCH: {
      console.log("FEED_FETCH");

      return { ...state, posts: action.payload };
    }
    case FEED_FETCH_ERROR: {
      console.log("FEED_FETCH_ERROR");

      return { ...state, error: action.payload };
    }

    default:
      return state;
  }
}

export default feedReducer;
