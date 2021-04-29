import React, { useState, useContext } from "react";
import { TComment } from "../interfaces/IPost";
import PostLike from "./PostLike";
import PostComment from "./PostComment";
import { LoginContext } from "../store/context/LoginContext";
import _ from "lodash";
import Error from "./Error";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { getPost } from "../store/redux/selector/Feed";

const Post = (props: any) => {
  const { username, userId } = useContext(LoginContext);

  const [comment, setComment] = useState("");

  console.log("props props props props");
  console.log(props);

  const commentSubmit = (e: any) => {
    e.preventDefault();

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

  function displayComments() {
    return props.post[0].commentList.map((c: any) => {
      return <PostComment key={c} {...c} />;
    });
  }

  return (
    <>
      <h2>{props.post[0].userName}</h2>
      <h3>{props.post[0].message}</h3>
      <div style={{ display: "flex" }}>
        <PostLike postId={props.post[0].id} />
      </div>
      <div>
        <div>{displayComments()}</div>
        <form onSubmit={commentSubmit}>
          <input
            type="text"
            id={uuidv4()}
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    post: getPost(state.feedState, ownProps.id),
  };
};

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     onPostComment: (comment_obj: TComment) =>
//       dispatch(doPostComment(comment_obj)),
//     onLikePost: (userId: string, username: string, postId: string) =>
//       dispatch(doLikePost(userId, username, postId)),
//   };
// };

// export default Post;
export default connect(mapStateToProps)(Post);
