import React, { useState, useContext, useEffect } from "react";
import { TComment } from "../../interfaces/IPost";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import PostLike from "./PostLike";
import PostComment from "./PostComment";
import { LoginContext } from "../../store/context/LoginContext";
import _, { countBy } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { doPostComment, doLikePost } from "../../store/redux/actions/feed_act";
import { useHistory, useParams } from "react-router-dom";
import styles from "./Post.module.scss";
import user from "./user.svg";
import comments from "./comments.svg";
import sendIcon from "./assets/send.svg";
import ImageSlider from "../../UI/ImageSlider";
import {
  fetchFeed,
  createComment,
  toggleLikePost,
  postCreate,
} from "../../utils/api/posts.api";

import { IPost, TLikes } from "../../interfaces/IPost";
import PostCommentList from "./PostCommentList";

const Post = (props: any) => {
  const history = useHistory();
  const { setCerror, currentUser } = useContext(LoginContext);
  const [likesCount, setLikesCount] = useState("") as any;

  // const [comment, setComment] = useState("");
  // const [commentList, setCommentList] = useState([]) as any;
  const [commentsCount, setCommentsCount] = useState(0);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const { postId } = useParams() as any;
  useEffect(() => {
    setLikesCount(props.post.likesCount);
    setCommentsCount(props.post.commentsCount);
    // setCommentList(props.post.commentList.reverse());
    if (postId) {
      setCommentsVisible(true);
    }
  }, []);

  const handleLikeProp = () => {
    toggleLikePost(props.post._id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("toggleLikePost toggleLikePost toggleLikePost");
        console.log(result);
        result.message === "liked"
          ? setLikesCount(likesCount + 1)
          : setLikesCount(likesCount - 1);
      }
    });
    // props.post.onLikeComment(like_obj);
  };

  const commentSubmitProp = (comment: string, cb: Function) => {
    console.log("vvvvvvvvvvvvvvvvvvv");
    console.log("vvvvvvvvvvvvvvvvvvv");
    console.log(comment);

    const comment_obj: any = {
      text: comment,
      postId: props.post._id,
    };

    createComment(comment_obj, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        // setCommentList([...commentList, result]);
        // setCommentList(_.concat(result, commentList));

        // setComment("");
        setCommentsCount(commentsCount + 1);
        cb(result);
      }
    });

    // props.post.onPostComment(comment_obj);
  };

  return (
    <div className={styles.postContainer}>
      <div key={props.post._id} className={styles.post}>
        <div className={styles.textContainer}>
          <p>{props.title}</p>
          <p>{props.post.text}</p>
        </div>

        <ImageSlider slides={props.post.images} />

        <div className={styles.likeCommentContainer}>
          <div className={styles.likeCommentNav}>
            <div className={styles.likesNames}>
              {/* {checkLiked() ? (
                <ThumbUpIcon
                  onClick={() => {
                    handleLike();
                  }}
                />
              ) : (
                <ThumbUpAltOutlinedIcon
                  onClick={() => {
                    handleLike();
                  }}
                />
              )} */}
              <div>
                <PostLike
                  postId={props.post._id}
                  likesCount={likesCount}
                  handleLikeProp={handleLikeProp}
                />
              </div>
            </div>

            <div className={styles.likesNames}>
              <img
                src={comments}
                onClick={() => setCommentsVisible(!commentsVisible)}
              />

              <div className={styles.commentCounter}>{commentsCount}</div>
            </div>
          </div>

          {commentsVisible && (
            <PostCommentList
              postId={props.post._id}
              commentSubmitProp={commentSubmitProp}
              commentsCount={commentsCount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
