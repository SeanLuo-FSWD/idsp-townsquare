import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { doFetchFeed } from "../../store/redux/actions/feed_act";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import Error from "../Error/Error";
import Post from "../../components/Post/Post";

const Feed = (props: any) => {
  useEffect(() => {
    props.onFetchFeed();
  }, []);

  return (
    <div>
      {props.feed.error ? (
        <Error message={props.feed.error} />
      ) : props.feed.posts.length > 0 ? (
        props.feed.posts.map((post: any) => {
          return <Post key={post.id} {...post}></Post>;
        })
      ) : (
        <div>
          <h2>loading...</h2>
        </div>
      )}
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
