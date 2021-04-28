import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { connect } from "react-redux";
import { doFetchFeed } from "../../store/redux/actions/feed";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import Post from "../../components/Post";
import Error from "../../components/Error";

const Feed = (props: any) => {
  const { username } = useContext(LoginContext);

  useEffect(() => {
    props.onFetchFeed();
  }, []);

  return (
    <div>
      <h1>Posts feed page</h1>
      <h2>Welcome: {username} </h2>

      <div>
        {props.feed.error ? (
          <Error message={props.feed.error} />
        ) : props.feed.posts.length > 0 ? (
          props.feed.posts.map((post: any) => {
            return <Post key={post.postId} {...post}></Post>;
          })
        ) : (
          <div>
            <h2>loading...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    feed: getFeed(state.feedState),
    error: getFeedError(state.feedState),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchFeed: () => dispatch(doFetchFeed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
