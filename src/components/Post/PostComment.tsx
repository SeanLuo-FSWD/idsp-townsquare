import React, { useState } from "react";
import { TComment } from "../../interfaces/IPost";
import styles from "./PostComments.module.scss";

const PostComment: React.FC<any> = (props) => {
  return (
    <>
      <div className={styles.allComments}>
        <div className={styles.commentContainer}>
          <img src={props.avatar} style={{ width: "50px", height: "50px" }} />
          <p className={styles.comment}>
            {props.username} {props.createdAt}
            <br></br>
            {props.text}
          </p>
        </div>
      </div>
    </>
  );
};

export default PostComment;
