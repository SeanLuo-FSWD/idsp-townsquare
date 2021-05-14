import React, { useState } from "react";
import { TLikes } from "../../interfaces/IPost";
import styles from "./PostLike.module.scss"

const PostLike = (props: any) => {
  const [show, setShow] = useState(false);
  function likeList() {
    console.log("like like like");
    console.log(props.like_arr);

    return props.like_arr.map((like: any) => {
      return (
        <li key={like.id}>
          {like.username} - {like.userId}
        </li>
      );
    });
  }

  return (
    <div className={styles.likes}>
      {show && <ul className={styles.likes} >{likeList()}</ul>}
      <p onClick={() => setShow(!show)}>{props.like_arr.length}</p>
    </div>
  );
};

export default PostLike;
