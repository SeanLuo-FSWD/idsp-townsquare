import {
  FEED_FETCH,
  API_ERROR,
  FeedActionTypes,
  COMMENT_ADD,
  POST_LIKE,
  POST_CREATE,
} from "../constants/actionTypes";
import { fetchFeed } from "../../../utils/api/posts";
import { IPost } from "../../../interfaces/IPost";
import _ from "lodash";

const INITIAL_STATE = {
  posts: <any[]>[],
  error: null,
};

function feedReducer(feedState = INITIAL_STATE, action: FeedActionTypes) {
  switch (action.type) {
    case POST_CREATE: {
      console.log("case POST_CREATE");
      console.log(action.post_obj_res);

      const feedStore = {
        ...feedState,
        posts: [...posts, action.post_obj_res],
      };
      return feedState;
    }
    case FEED_FETCH: {
      console.log("case FEED_FETCH");
      console.log(action.posts);

      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");

      const feedStore = { ...feedState, posts: action.posts };
      console.log(feedStore);

      return feedStore;
    }
    case API_ERROR: {
      console.log("case API_ERROR");
      console.log(action.error);

      return { ...feedState, error: action.error };
    }

    case POST_LIKE: {
      console.log("case POST_LIKE");

      const new_liking_posts = feedState.posts.map((post) => {
        if (post.postId == action.post_like.postId) {
          const if_liked = _.filter(
            post.likes,
            (o) => o.userId == action.post_like.userId
          );

          if (if_liked.length == 0) {
            const new_likes = [
              ...post.likes,
              ...[
                {
                  userId: action.post_like.userId,
                  username: action.post_like.username,
                },
              ],
            ];

            return { ...post, likes: new_likes };
          } else {
            const new_unlikes = _.filter(
              post.likes,
              (o) => o.userId != action.post_like.userId
            );

            return { ...post, likes: new_unlikes };
          }
        } else {
          return post;
        }
      });

      return { ...feedState, posts: new_liking_posts };
    }

    case COMMENT_ADD: {
      console.log("case COMMENT_ADD");

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
