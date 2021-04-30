import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { connect } from "react-redux";
import { doFetchFeed, doPostCreate } from "../../store/redux/actions/feed";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import Post from "../../components/Post/Post";
import Error from "../../components/Error/Error";
import { v4 as uuidv4 } from "uuid";
import { IPost } from "../../interfaces/IPost";

const Feed = (props: any) => {
  const { username } = useContext(LoginContext);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    props.onFetchFeed();
  }, []);

  const postSubmit = (e: any) => {
    e.preventDefault();

    const post_obj: IPost = {
      postId: uuidv4(),
      userName: username,
      createdAt: new Date(),
      title: title,
      message: message,
      likes: [],
      commentList: [],
    };

    props.onPostCreate(post_obj);
  };

  return (
    <div>
      <h1>Posts feed page</h1>
      <h2>Welcome: {username}</h2>

      <div>
        <form onSubmit={postSubmit}>
          Title:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows={4}
            cols={50}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input type="submit" />
        </form>
      </div>

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
    onPostCreate: (post_obj: IPost) => dispatch(doPostCreate(post_obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
