import { IPost, TComment, TLikes } from "../../../interfaces/IPost";

// export const POST_ADD = "POST_ADD";
export const FEED_FETCH = "FEED_FETCH";
export const API_ERROR = "API_ERROR";
export const COMMENT_ADD = "COMMENT_ADD";
export const POST_LIKE = "POST_LIKE";

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
  post_like: {
    id: string;
    userId: string;
    username: string;
    postId: string;
    liked: boolean;
  };
}

export type FeedAction =
  | FeedFetchAction
  | ErrorAction
  | CommentAddAction
  | LikeAction;

export type FeedActionTypes = FeedAction;
