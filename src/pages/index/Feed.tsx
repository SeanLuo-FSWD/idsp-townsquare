import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doFetchFeed } from "../../store/redux/actions/feed";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import IFeed from "../../interfaces/redux";
import Post from "../../components/Post";
import "./Feed.scss";

interface IProps {
  children?: React.ReactNode;
  onFetchFeed: Function;
  feed: IFeed;
}

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
          <h2 className="error">{props.feed.error}</h2>
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
