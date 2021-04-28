import { IPost, TComment } from "../../../interfaces/IPost";

// export const POST_ADD = "POST_ADD";
export const FEED_FETCH = "FEED_FETCH";
export const API_ERROR = "API_ERROR";
export const COMMENT_ADD = "COMMENT_ADD";

export interface FeedFetchAction {
  type: typeof FEED_FETCH;
  posts: IPost[];
}

export interface ErrorAction {
  type: typeof API_ERROR;
  error: string;
}

export interface CommentAddAction {
  type: typeof COMMENT_ADD;
  comment_obj: TComment;
}

export type FeedAction = FeedFetchAction | ErrorAction | CommentAddAction;

export type FeedActionTypes = FeedAction;
