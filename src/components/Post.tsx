import React, { useState, useContext } from "react";
import { TComment } from "../interfaces/IPost";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import PostLike from "./PostLike";
import PostComment from "./PostComment";
import { LoginContext } from "../store/context/LoginContext";
import _ from "lodash";
import { likePost, addComment } from "../utils/api/posts";
import Error from "./Error";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { doPostComment } from "../store/redux/actions/feed";

const Post = (props: any) => {
  const [likes, setLikes] = useState(props.likes);
  const [liked, setLiked] = useState(false);
  const [likeError, setLikeError] = useState("");
  const { username, userId } = useContext(LoginContext);

  const [comment, setComment] = useState("");
  const [addCommentError, setAddCommentError] = useState("");

  const commentSubmit = (e: any) => {
    e.preventDefault();
    console.log(comment);

    const comment_obj: TComment = {
      userId: userId,
      username: username,
      createdAt: new Date(),
      message: comment,
      commentId: uuidv4(),
      postId: props.postId,
    };

    props.onPostComment(comment_obj);
  };

  const handleLike = () => {
    likePost(userId, props.postId, (err: Error, result: any) => {
      if (err) {
        console.log(err);
        // setLikeError(err.message);
      } else {
        setLiked(!liked);
        if (liked) {
          let unliked = _.filter(likes, (o) => o.userId != userId);
          setLikes(unliked);
        } else {
          setLikes([...likes, { userId: userId, username: username }]);
        }
      }
    });
  };

  function displayComments() {
    return props.commentList.map((c: TComment) => {
      return <PostComment key={c.commentId} {...c} />;
      // return <PostComment comment={c} />;
    });
  }

  return (
    <>
      {/* <h5>{props.feed.posts.length}</h5> */}
      <h2>{props.userName}</h2>
      <h3>{props.message}</h3>
      <div style={{ display: "flex" }}>
        {liked ? (
          <ThumbUpIcon onClick={handleLike} />
        ) : (
          <ThumbUpAltOutlinedIcon onClick={handleLike} />
        )}
        <PostLike like_arr={likes} />
        {likeError && <Error message={likeError} />}
      </div>
      <div>
        <div>{displayComments()}</div>
        <form onSubmit={commentSubmit}>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">add Comment</button>
        </form>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPostComment: (comment_obj: TComment) =>
      dispatch(doPostComment(comment_obj)),
  };
};

// export default Post;
export default connect(null, mapDispatchToProps)(Post);
