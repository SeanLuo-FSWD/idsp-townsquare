import {
  FEED_FETCH,
  API_ERROR,
  FeedActionTypes,
  COMMENT_ADD,
  POST_LIKE,
} from "../constants/actionTypes";
import { fetchFeed } from "../../../utils/api/posts";
import { IPost } from "../../../interfaces/IPost";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
  posts: null as null | any,
  error: null,
};

function feedReducer(feedState = INITIAL_STATE, action: FeedActionTypes) {
  switch (action.type) {
    case FEED_FETCH: {
      console.log("case FEED_FETCH");
      console.log(action.posts);

      return { ...feedState, posts: action.posts };
    }
    case API_ERROR: {
      console.log("case API_ERROR");
      console.log(action.error);

      return { ...feedState, error: action.error };
    }

    case POST_LIKE: {
      console.log("case POST_LIKE");
      console.log(action);

      console.log("xxxxxxxxxxx");
      console.log(feedState);

      const detailed_likes = {
        ...feedState.posts.entities.likes,
        [action.post_like.userId]: {
          id: action.post_like.id,
          postId: action.post_like.postId,
          userId: action.post_like.userId,
          username: action.post_like.username,
        },
      };

      const liking_post = {
        ...feedState.posts.entities.posts[action.post_like.postId],
        likes: [
          ...feedState.posts.entities.posts[action.post_like.postId].likes,
          action.post_like.id,
        ],
      };

      const ref_state = {
        ...feedState,
        posts: {
          ...feedState.posts,
          entities: {
            ...feedState.posts.entities,
            likes: detailed_likes,
            posts: {
              ...feedState.posts.entities.posts,
              [action.post_like.postId]: liking_post,
            },
          },
        },
      };

      return ref_state;
    }

    case COMMENT_ADD: {
      console.log("case COMMENT_ADD");

      // const new_state_post = feedState.posts.map((post) => {
      //   if (post.postId == action.comment_obj.postId) {
      //     const new_commentList = [...post.commentList, action.comment_obj];

      //     return { ...post, commentList: new_commentList };
      //   } else {
      //     return post;
      //   }
      // });

      // return { ...feedState, posts: new_state_post };
      return feedState;
    }

    default:
      return feedState;
  }
}

export default feedReducer;
