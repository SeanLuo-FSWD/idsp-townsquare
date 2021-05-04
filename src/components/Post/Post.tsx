import React, { useState, useContext, useEffect } from "react";
import { TComment } from "../../interfaces/IPost";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import PostLike from "./PostLike";
import PostComment from "./PostComment";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { doPostComment, doLikePost } from "../../store/redux/actions/feed_act";
import styles from "./Post.module.scss";
import ImageSlider from "../../UI/ImageSlider";
import {
  fetchFeed,
  addComment,
  likePost,
  postCreate,
} from "../../utils/api/posts.api";

import { IPost, TLikes } from "../../interfaces/IPost";

const Post = (props: any) => {
  const { username, userId, setCerror, currentUser } = useContext(LoginContext);
  const [likes, setLikes] = useState([]) as any;

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]) as any;

  const [commentsVisible, setCommentsVisible] = useState(false);

  useEffect(() => {
    setLikes(props.post.likes);
  }, []);

  const commentSubmit = (e: any) => {
    e.preventDefault();

    // const comment_obj: TComment = {
    //   userId: userId,
    //   username: username,
    //   createdAt: new Date(),
    //   message: comment,
    //   id: uuidv4(),
    //   postId: props.post.id,
    // };

    const comment_obj: TComment = {
      userId: currentUser.id,
      username: currentUser.username,
      createdAt: new Date(),
      message: comment,
      id: uuidv4(),
      postId: props.post.id,
    };

    addComment(comment_obj, (err: Error, result: IPost[]) => {
      if (err) {
        setCerror(err.message);
      } else {
        setCommentList([...commentList, result]);
      }
    });

    // props.post.onPostComment(comment_obj);
  };

  const handleLike = (isLike: boolean) => {
    const like_obj = {
      id: uuidv4(),
      userId: userId,
      username: username,
      postId: props.post.id,
      isLike: isLike,
    };

    likePost(like_obj, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        delete result["isLike"];

        // const new_likes = isLike
        //   ? _.filter(likes, (o) => o.userId == userId)
        //   : [...likes, result];

        const new_likes = isLike
          ? [...likes, result]
          : _.filter(likes, (o) => o.userId != userId);

        setLikes(new_likes);
      }
    });

    // props.post.onLikeComment(like_obj);
  };

  function checkLiked(): boolean {
    // return TRUE if liked
    return _.filter(likes, (o) => o.userId == userId).length != 0;
  }

  return (
    <div key={props.post.postId} className={styles.post}>
      <div className="flex--space-between">
        <h4>{props.post.userName}</h4>
        <h4>{props.post.createdAt}</h4>
      </div>
      {/* <h2>{props.title}</h2> */}
      <h5 style={{ paddingLeft: "20px" }}>{props.post.message}</h5>

      <ImageSlider slides={props.post.img_urls} />
      <div className="flex--space-between">
        <div className="flex">
          {checkLiked() ? (
            <ThumbUpIcon
              onClick={() => {
                handleLike(false);
              }}
            />
          ) : (
            <ThumbUpAltOutlinedIcon
              onClick={() => {
                handleLike(true);
              }}
            />
          )}
          <PostLike like_arr={likes} />
        </div>
        <div>
          <h4
            style={{ textDecoration: "underline" }}
            onClick={() => setCommentsVisible(!commentsVisible)}
          >
            See comments
          </h4>
        </div>
      </div>

      {commentsVisible && (
        <div>
          <div>
            {commentList.map((c: TComment) => {
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

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     onPostComment: (comment_obj: TComment) =>
//       dispatch(doPostComment(comment_obj)),
//     onLikeComment: (like_obj: any) => dispatch(doLikePost(like_obj)),
//   };
// };

// export default Post;
// export default connect(null, mapDispatchToProps)(Post);

export default Post;
