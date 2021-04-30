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
        posts: [...[action.post_obj_res.post_obj], ...feedState.posts],
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

      let new_likes_arr = [];

      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(feedState.posts);

      console.log("sssssssssssssssssssssssss");
      console.log(action.post_like);

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

      const updated_likes = {
        ...feedState.posts[action.post_like.postId],
        likes: new_likes_arr,
      };

      // const final_state3 = {
      //   ...feedState,
      //   posts: {
      //     ...feedState.posts[action.post_like.postId],
      //     likes: updated_likes,
      //   },
      // };

      console.log("fffffffffffffffffffffff");
      console.log(updated_likes);

      // const final_state = {
      //   ...feedState,
      //   posts: {
      //     ...feedState.posts[action.post_like.postId],
      //     likes: {
      //       ...feedState.posts[action.post_like.postId],
      //       likes: updated_likes,
      //     },
      //   },
      // };

      const final_state = {
        ...feedState,
        posts: {
          ...feedState.posts,
          [action.post_like.postId]: {
            ...feedState.posts[action.post_like.postId],
            likes: updated_likes,
          },
        },
      };

      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(final_state);

      console.log("ddddddddddddddddddddddd");
      console.log(feedState);
      return feedState;
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
