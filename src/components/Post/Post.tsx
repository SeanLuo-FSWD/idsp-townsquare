import React, { useState, useContext, useEffect } from "react";
import PostLike from "./PostLike";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import styles from "./Post.module.scss";
import comments from "./comments.svg";
import ImageSlider from "../../UI/ImageSlider";
import { createComment, toggleLikePost } from "../../utils/api/posts.api";
import socket from "../../utils/socketIO.util";

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
    toggleLikePost(
      props.post._id,
      props.post.userId,
      (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
        } else {
          console.log("toggleLikePost toggleLikePost toggleLikePost");

          console.log(result);
          console.log("props.post");
          console.log(props.post);

          result.data.like_status === "liked"
            ? setLikesCount(likesCount + 1)
            : setLikesCount(likesCount - 1);

          console.log("result.data.notification_result");

          console.log(result.data.notification_result);

          const notification_obj = result.data.notification_result;

          // {receiverId: "60a76224da25031a2c9d38d0", createdAt: "Sat May 22 2021 00:06:33 GMT-0700 (Pacific Daylight Time)", message: "sponge bob has liked your post", link: "/post/60a76986e29a171eb6d18661", _id: "60a8ad7997502532370ff646"}

          if (notification_obj) {
            socket.emit("notification", notification_obj);
          }
        }
      }
    );
    // props.post.onLikeComment(like_obj);
  };

  const commentSubmitProp = (comment: string, cb: Function) => {
    console.log("vvvvvvvvvvvvvvvvvvv");
    console.log("vvvvvvvvvvvvvvvvvvv");
    console.log(comment);

    const comment_obj: any = {
      text: comment,
      postId: props.post._id,
      receiverId: props.post.userId,
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
          {/* <div>{props.title}</div> */}
          <div>{props.post.text}</div>
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
                  paramPostId={postId}
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
