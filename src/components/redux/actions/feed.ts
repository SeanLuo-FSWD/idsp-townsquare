import {
  FEED_FETCH,
  POST_ADD,
  FEED_FETCH_ERROR,
} from "../constants/actionTypes";

const doAddPost = (post: {}) => ({
  type: POST_ADD,
  post,
});

const doFetchFeed = () => ({
  type: FEED_FETCH,
});

const doFetchFeedError = (error: string) => ({
  type: FEED_FETCH_ERROR,
  error,
});

export { doAddPost, doFetchFeed, doFetchFeedError };
