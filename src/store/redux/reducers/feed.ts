import {
  FEED_FETCH,
  API_ERROR,
  FeedActionTypes,
  COMMENT_ADD,
  POST_LIKE,
  POST_CREATE,
} from "../constants/actionTypes";
import { fetchFeed } from "../../../utils/api/posts.api";
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
        posts: [...[action.post_obj_res], ...feedState.posts],
      };

      return feedStore;
    }
    case FEED_FETCH: {
      console.log("case FEED_FETCH");
      console.log(action.posts);

      const feedStore = { ...feedState, posts: action.posts };

      return feedStore;
    }
    case API_ERROR: {
      console.log("case API_ERROR");
      console.log(action.error);

      return { ...feedState, error: action.error };
    }

    case POST_LIKE: {
      console.log("case POST_LIKE");

      let new_likes_arr: any[] = [];

      for (let i = 0; i < feedState.posts.length; i++) {
        if (feedState.posts[i].id == action.post_like.postId) {
          if (!action.post_like.isLike) {
            new_likes_arr = _.filter(
              feedState.posts[i].likes,
              (w) => w.userId != action.post_like.userId
            );
          } else {
            new_likes_arr = [
              ...feedState.posts[i].likes,
              ...[
                {
                  id: action.post_like.id,
                  userId: action.post_like.userId,
                  postId: action.post_like.postId,
                  username: action.post_like.username,
                },
              ],
            ];
          }
          break;
        }
      }

      const new_post_list = feedState.posts.map((post) => {
        if (post.id == action.post_like.postId) {
          return {
            ...post,
            likes: new_likes_arr,
          };
        }
        return { ...post };
      });

      const final_state = {
        ...feedState,
        posts: new_post_list,
      };

      return final_state;
    }

    case COMMENT_ADD: {
      console.log("case COMMENT_ADD");

      const new_state_post = feedState.posts.map((post) => {
        if (post.id == action.comment_obj.postId) {
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
