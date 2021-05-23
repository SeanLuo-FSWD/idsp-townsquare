import React, { useState, useContext, useEffect } from "react";
import PostComment from "./PostComment";
import styles from "./postCommentList.module.scss";
import {
  createComment,
  getAllCommentsByPostId,
} from "../../utils/api/posts.api";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import replyArrow from "./assets/replyArrow.svg";
import socket from "../../utils/socketIO.util";

function PostCommentList({ postId, commentSubmitProp, commentsCount }: any) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]) as any;
  const { setCerror } = useContext(LoginContext);

  useEffect(() => {
    // setTimeout(() => {
    getAllCommentsByPostId(postId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("ggggggggggggggggggggggg");
        console.log(result.data.comments);

        setCommentList(result.data.comments);
      }
    });
    // }, 2000);
  }, []);

  function onCommentSubmit(e: any) {
    e.preventDefault();
    commentSubmitProp(comment, (result: any) => {
      console.log("callback worked==============================");
      console.log(commentList);
      console.log("result");
      console.log(result);
      setComment("");

      setCommentList(_.concat(result.result, commentList));

      console.log("result.data.notification_result --- comment");
      console.log(result);

      console.log(result.notification_result);

      const notification_obj = result.notification_result;

      // {receiverId: "60a76224da25031a2c9d38d0", createdAt: "Sat May 22 2021 00:06:33 GMT-0700 (Pacific Daylight Time)", message: "sponge bob has liked your post", link: "/post/60a76986e29a171eb6d18661", _id: "60a8ad7997502532370ff646"}

      if (notification_obj) {
        socket.emit("notification", notification_obj);
      }
    });
  }

  console.log("lengthhhhhhhhhhh");
  console.log(commentList.length);
  console.log(commentList);

  return (
    <div className={styles.commentNumber}>
      {commentList.length > 0 && (
        <div>
          {commentList.map((c: any) => {
            console.log("fffffffffffffffffffffff");
            console.log("fffffffffffffffffffffff");
            console.log(c._id);

            return <PostComment key={c._id} {...c} />;
          })}
        </div>
      )}
      <form className={styles.commentSubmitForm} onSubmit={onCommentSubmit}>
        <input
          className={styles.commentInput}
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className={styles.addCommentButton} type="submit">
          Comment
          <img className={styles.replyArrow} src={replyArrow} />
        </button>
      </form>
      {/* <h4>{commentsCount}</h4> */}
    </div>
  );
}

export default PostCommentList;
