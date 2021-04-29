import { IPost } from "../../../interfaces/IPost";
import IFeed from "../../../interfaces/redux";
import _ from "lodash";
import { schema, denormalize } from "normalizr";

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
  const commentSchema = new schema.Entity("commentList");
  const likesSchema = new schema.Entity("likes");

  const feedSchema = new schema.Entity("posts", {
    commentList: [commentSchema],
    likes: [likesSchema],
  });

  const entities = feedState.posts.entities;
  const ids = feedState.posts.result; // What's sibling to entities in the normed state.

  let denormed_feed = denormalize(ids, [feedSchema], entities);
  console.log("zzzzzzzzzzz");
  console.log(feedState);
  console.log("z-----z");
  console.log(denormed_feed); /// When you denormalize, turn undefined.

  // const likes = feedState.posts.entities.likes;
  // console.log("oh whaaaaaaat");
  // console.log(likes);

  let dp = denormed_feed.filter(function (post: any) {
    console.log("oooooooo");
    console.log(post);
    return post.id == postId;
  });

  console.log("dp dp dp dp");
  console.log(dp);

  return dp[0]["likes"];
};

const getFeedError = (feedState: IFeed) => feedState.error;

export { getFeed, getFeedError, getPost, getLike };
