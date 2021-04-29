import { IPost } from "../../../interfaces/IPost";
import IFeed from "../../../interfaces/redux";
import _ from "lodash";

const getFeed = (feedState: any) => {
  console.log("feedState feedState feedState");

  console.log(feedState);
  return feedState.posts ? feedState.posts.result : [];
};

const getPost = (feedState: any, id: string) => {
  const post = _.filter(feedState.posts.entities.posts, (o) => o.id == id);

  return post;
};

const getLike = (feedState: any, postId: string) => {
  const post = feedState.posts.entities.posts[postId];
  const likes = feedState.posts.entities.likes;

  let like_arr = <any>[];
  post["likes"].forEach((like_id: string) => {
    for (const [key, value] of Object.entries(likes)) {
      if (likes[key]["id"] == like_id) {
        like_arr = [...like_arr, ...[value]];
      }
    }
  });

  return like_arr;
};

const getFeedError = (feedState: IFeed) => feedState.error;

export { getFeed, getFeedError, getPost, getLike };
