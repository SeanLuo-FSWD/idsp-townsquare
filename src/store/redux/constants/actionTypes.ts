import { IPost } from "../../../interfaces/IPost";

// export const POST_ADD = "POST_ADD";
export const FEED_FETCH = "FEED_FETCH";
export const FEED_FETCH_ERROR = "FEED_FETCH_ERROR";

export interface FeedFetchAction {
  type: typeof FEED_FETCH;
  posts: IPost[];
}

export interface FeedErrorAction {
  type: typeof FEED_FETCH_ERROR;
  error: string;
}

export type FeedAction = FeedFetchAction | FeedErrorAction;

export type FeedActionTypes = FeedAction;
