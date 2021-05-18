import React, { useState } from "react";
import { TComment } from "../../interfaces/IPost";
import styles from "./PostComments.module.scss";

const PostComment: React.FC<any> = (props) => {
  return (
    <>
      <div className={styles.allComments}>
        <div className={styles.commentContainer}>
          <img className={styles.commentAvatar} src={props.avatar} style={{ width: "50px", height: "50px" }} />
          <div className={styles.comment}>
            <div>
              {props.username}
            </div>
            <div className={styles.commentDate}>
              {new Date(props.createdAt).toDateString()}
            </div>
            <div className={styles.commentText}>
              {props.text}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostComment;
