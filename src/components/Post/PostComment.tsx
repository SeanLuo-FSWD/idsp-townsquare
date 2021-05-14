import React, { useState } from "react";
import { TComment } from "../../interfaces/IPost";
import styles from "./PostComments.module.scss";

const PostComment: React.FC<TComment> = (props) => {
  return (
    <>
      <div className={styles.allComments}>
        <div className={styles.commentContainer}>
            <p  className={styles.comment}>
                {props.username} {props.createdAt}
                <br></br>
                {props.message}
              </p>

        </div>
      </div>
      
    </>
  );
};

export default PostComment;
