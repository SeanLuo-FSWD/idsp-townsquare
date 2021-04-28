import React, { useState } from "react";
import { TLikes } from "../interfaces/IPost";

const PostLike = (props: any) => {
  const [show, setShow] = useState(false);
  function likeList() {
    console.log("like like like");
    console.log(props.like_arr);

    return props.like_arr.map((like: TLikes) => {
      console.log(like);

      return <li key={like.userId}>{like.username}</li>;
    });
  }

  return (
    <div>
      {show && <ul>{likeList()}</ul>}
      <h4 onClick={() => setShow(!show)}>{props.like_arr.length}</h4>
    </div>
  );
};

export default PostLike;
