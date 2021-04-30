import React, { useState, useContext } from "react";
import { TComment } from "../../interfaces/IPost";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import PostLike from "./PostLike";
import PostComment from "./PostComment";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import Error from "../Error/Error";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { doPostComment, doLikePost } from "../../store/redux/actions/feed";

const Post = (props: any) => {
  const { username, userId } = useContext(LoginContext);

  const [comment, setComment] = useState("");
  const [commentsVisible, setCommentsVisible] = useState(false);

  const commentSubmit = (e: any) => {
    e.preventDefault();

    const comment_obj: TComment = {
      userId: userId,
      username: username,
      createdAt: new Date(),
      message: comment,
      id: uuidv4(),
      postId: props.postId,
    };

    props.onPostComment(comment_obj);
  };

  const handleLike = () => {
    props.onLikeComment(userId, username, props.postId);
  };

  function checkLiked(): boolean {
    return _.filter(props.likes, (o) => o.userId == userId).length != 0;
  }

  return (
    <div key={props.postId}>
      <div className="flex--space-between">
        <h4>{props.userName}</h4>
        <h4>{props.createdAt}</h4>
      </div>
      <h2>{props.title}</h2>
      <h5 style={{ paddingLeft: "20px" }}>{props.message}</h5>
      <div className="flex--space-between">
        <div className="flex">
          {checkLiked() ? (
            <ThumbUpIcon onClick={handleLike} />
          ) : (
            <ThumbUpAltOutlinedIcon onClick={handleLike} />
          )}
          <PostLike like_arr={props.likes} />
        </div>
        <div>
          <h4
            style={{ textDecoration: "underline" }}
            onClick={() => setCommentsVisible(!commentsVisible)}
          >
            See Comments
          </h4>
        </div>
      </div>

      {commentsVisible && (
        <div>
          <div>
            {props.commentList.map((c: TComment) => {
              return <PostComment key={c.id} {...c} />;
            })}
          </div>
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
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPostComment: (comment_obj: TComment) =>
      dispatch(doPostComment(comment_obj)),
    onLikeComment: (userId: string, username: string, postId: string) =>
      dispatch(doLikePost(userId, username, postId)),
  };
};

// export default Post;
export default connect(null, mapDispatchToProps)(Post);
