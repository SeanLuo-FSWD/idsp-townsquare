import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { connect } from "react-redux";
import { doFetchFeed } from "../../store/redux/actions/feed_action";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import Post from "../../components/Post";
import Error from "../../components/Error";

const Feed = (props: any) => {
  const { username, userId } = useContext(LoginContext);

  useEffect(() => {
    props.onFetchFeed();
  }, []);

  return (
    <div>
      <h1>Feed page</h1>
      <h2>Welcome: {username} </h2>

      <div>
        {props.error ? (
          <Error message={props.error} />
        ) : props.feed_IDs.length > 0 ? (
          props.feed_IDs.map((id: any) => {
            return <Post key={id} id={id}></Post>;
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
    feed_IDs: getFeed(state.feedState),
    error: getFeedError(state.feedState),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchFeed: () => dispatch(doFetchFeed()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
