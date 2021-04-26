import { FEED_FETCH, FEED_FETCH_ERROR } from "../constants/actionTypes";
import fetchFeed from "../../api/posts";

const INITIAL_STATE = {
  posts: [],
  error: null,
};

function feedReducer(state = INITIAL_STATE, action: { type: string }) {
  switch (action.type) {
    case FEED_FETCH: {
      return { ...state, posts: fetchFeed() };
    }
    case FEED_FETCH_ERROR: {
      return { ...state, error: "an error occured" };
    }
    default:
      return state;
  }
}

export default feedReducer;
