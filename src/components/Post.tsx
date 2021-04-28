import React, { useState, useContext } from "react";
import { IPost, TLikes, TComment } from "../interfaces/IPost";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import PostLike from "./PostLike";
import PostComment from "./PostComment";
import { LoginContext } from "../store/context/LoginContext";
import _ from "lodash";
import { likePost } from "../utils/api/posts";
import Error from "./Error";

const Post = (props: IPost) => {
  const [likes, setLikes] = useState(props.likes);
  const [liked, setLiked] = useState(false);
  const [likeError, setLikeError] = useState("");

  const { username, userId } = useContext(LoginContext);
  const handleLike = () => {
    likePost(userId, props.postId, (err: Error, result: any) => {
      if (err) {
        console.log(err);
        setLikeError(err.message);
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
      return <PostComment {...c} />;
      // return <PostComment comment={c} />;
    });
  }

  return (
    <>
      <h2>{props.userName}</h2>
      <h3>{props.message}</h3>
      <div style={{ display: "flex" }}>
        {liked ? (
          <ThumbUpIcon onClick={handleLike} />
        ) : (
          <ThumbUpAltOutlinedIcon onClick={handleLike} />
        )}
        <PostLike likes={likes} />
        {likeError && <Error message={likeError} />}
      </div>
      <div>{displayComments()}</div>
    </>
  );
};

export default Post;
