import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { doFetchFeed } from "../../store/redux/actions/feed_act";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import Error from "../Error/Error";
import Post from "../../components/Post/Post";
import { fetchFeed } from "../../utils/api/posts.api";

const Feed = (props: any) => {
  if (!props.feed) {
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  }

  return props.feed.map((post: any) => {
    return <Post key={post.id} post={post}></Post>;
  });
};

export default Feed;
