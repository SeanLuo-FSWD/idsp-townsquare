import React, { useState } from "react";
import { TLikes } from "../interfaces/IPost";

const PostLike = (props: any) => {
  const [show, setShow] = useState(false);
  function likeList() {
    return props.likes.map((user: TLikes) => {
      return <li key={user.userId}>{user.username}</li>;
    });
  }

  return (
    <div>
      {show && <ul>{likeList()}</ul>}
      <h4 onClick={() => setShow(!show)}>{props.likes.length}</h4>
    </div>
  );
};

export default PostLike;
