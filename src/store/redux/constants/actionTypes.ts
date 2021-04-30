import { IPost, TComment, TLikes } from "../../../interfaces/IPost";

// export const POST_ADD = "POST_ADD";
export const FEED_FETCH = "FEED_FETCH";
export const API_ERROR = "API_ERROR";
export const COMMENT_ADD = "COMMENT_ADD";
export const POST_LIKE = "POST_LIKE";
export const POST_CREATE = "POST_CREATE";

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

export interface LikeAction {
  type: typeof POST_LIKE;
  post_like: { userId: string; username: string; postId: string };
}

export interface postCreateAction {
  type: typeof POST_CREATE;
  post_obj_res: {};
}

export type FeedAction =
  | FeedFetchAction
  | ErrorAction
  | CommentAddAction
  | LikeAction
  | postCreateAction;

export type FeedActionTypes = FeedAction;
